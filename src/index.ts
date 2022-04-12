import {Context, Schema} from "koishi";
import express from 'express';

interface Config {
    port?: number,
    list: string[],
}

enum Type {
    UPDATE_DOC = '文档更新',
    CREATE_DOC = '文档发布',
    DELETE_DOC = '文档删除',
}
declare module 'koishi' {
    interface Channel {
        yuque:number,
    }
}

const using = ['database'] as const;
const name = 'yuque';
const Config = Schema.object({
    port: Schema.number().default(10080).description('WebHook监听端口'),
    list: Schema.array(Schema.string()).description('配置转发的频道列表'),
})

async function apply(ctx: Context, conf: Config = {port: 10080, list: []}) {
    ctx.model.extend('channel',{
        yuque:'integer',
    })
    const app = express();
    const log = ctx.logger('yuque');
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

export {using,name,Config,apply};