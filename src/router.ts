import {Context} from "koishi";
import body from "koa-body";
import {Config, Type} from "./types";

async function router(ctx: Context, conf: Config) {
    async function getUserName(id: string) {
        const res = await ctx.http.get(`https://www.yuque.com/api/v2/users/${id}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                'X-Auth-Token': 'ssHgJoZIlE770Eilv7kvf5DO6pxbUHWdBbrk98PZ',
            }
        });
        return res.data.data.name;
    }

    async function getChannels() {
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
        return Array.from(set);
    }

    ctx.router.post('/api/yuque', body(), async (kctx) => {
        const list = await getChannels();
        const title = kctx.request.body.data.title;
        const book = kctx.request.body.data.book.name;
        let user: string;
        if (kctx.request.body.data.user.type === 'Group') {
            user = await getUserName(kctx.request.body.data.user_id);
        } else {
            user = kctx.request.body.data.user.name;
        }
        const path = kctx.request.body.data.path;
        const typeRaw = kctx.request.body.data.action_type;
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
        kctx.response.body = '<h1>Copy That</h1>';
    });
}

export {router};
