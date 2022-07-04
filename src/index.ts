import {Context, Schema} from "koishi";
import {Config} from "./types";
import {router} from "./router";
import {cmd} from "./cmd";

declare module 'koishi' {
    interface Channel {
        yuque:number,
    }
}

const using = ['database'] as const;
const name = 'yuque';
const Config = Schema.object({
    list: Schema.array(Schema.string()).description('配置转发的频道列表'),
})

async function apply(ctx: Context, conf: Config = {port: 10080, list: []}) {
    ctx.model.extend('channel', {
        yuque: 'integer',
    })
    await router(ctx, conf);
    await cmd(ctx, conf);
}

export {using,name,Config,apply};
