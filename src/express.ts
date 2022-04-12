import {Context, Logger} from "koishi";
import express from "express";
import {Config, Type} from "./types";

async function expr(ctx:Context,log:Logger,conf:Config){
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.post('/', async (req, res) => {
        const title = req.body.data.title;
        const book = req.body.data.book.name;
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
        const txt = `【${type}】\n————————\n“${book}”知识库的《${title}》发生${type}`;
        await ctx.broadcast(conf.list, txt);
        res.end('<h1>Copy That</h1>');
    });
    app.listen(conf.port, () => {
        log.info(`Start Listening on port ${conf.port}`);
    })
}

export {expr};