import {Context, Logger} from "koishi";
import express from "express";
import {Config, Type} from "./types";
import axios from "axios";

async function getUserName(id:string){
    const res=await axios.get(`https://www.yuque.com/api/v2/users/${id}`,{
        headers:{
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
            'X-Auth-Token':'ssHgJoZIlE770Eilv7kvf5DO6pxbUHWdBbrk98PZ',
        }
    });
    return res.data.data.name;
}

async function expr(ctx:Context,log:Logger,conf:Config){
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.post('/', async (req, res) => {
        // Get Channels from Database
        const dbList = await ctx.database.get('channel', {yuque: 1});
        const clist: string[] = [];
        for (const chn of dbList) {
            const channel = `${chn.platform}:${chn.id}`;
            clist.push(channel);
        }
        clist.push(...conf.list);
        // 去重
        const set = new Set(clist);
        const list = Array.from(set);
        const title = req.body.data.title;
        const book = req.body.data.book.name;
        let user: string;
        if (req.body.data.user.type === 'Group') {
            user = await getUserName(req.body.data.user_id);
        } else {
            user = req.body.data.user.name;
        }
        const path = req.body.data.path;
        const typeRaw = req.body.data.action_type;
        let type;
        switch (typeRaw) {
            case 'update': {
                type = Type.UPDATE_DOC;
                break;
            }
            case 'publish': {
                type = Type.CREATE_DOC;
                break;
            }
            case 'delete': {
                type = Type.DELETE_DOC;
                break;
            }
            case 'comment_create': {
                type = Type.CREATE_COMMENT;
                break;
            }
            case 'comment_update': {
                type = Type.UPDATE_COMMENT;
                break;
            }
            case 'new_review': {
                type = Type.NEW_REVIEW;
                break;
            }
            case 'complete_review': {
                type = Type.COMPLETE_REVIEW;
                break;
            }
            case 'cancel_review': {
                type = Type.CANCEL_REVIEW;
                break;
            }
        }
        const txt = `【${type}】《${title}》\n\n知识库：${book}\n操作人：${user}\n地址：https://www.yuque.com/${path}\n——————————`;
        await ctx.broadcast(list, txt);
        res.end('<h1>Copy That</h1>');
    });
    app.listen(conf.port, () => {
        log.info(`Start Listening on port ${conf.port}`);
    })
}

export {expr};