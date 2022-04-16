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
        const title = req.body.data.title;
        const book = req.body.data.book.name;
        const user=await getUserName(req.body.data.user_id);
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
        }
        const txt = `【${type}】\n————————\n${user}对“${book}”知识库的《${title}》进行${type}操作`;
        await ctx.broadcast(conf.list, txt);
        res.end('<h1>Copy That</h1>');
    });
    app.listen(conf.port, () => {
        log.info(`Start Listening on port ${conf.port}`);
    })
}

export {expr};