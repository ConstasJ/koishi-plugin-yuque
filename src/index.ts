import {Context, Schema} from "koishi";
import {Config} from "./types";
import {expr} from "./express";

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
    const log = ctx.logger('yuque');
    await expr(ctx,log,conf);
}

export {using,name,Config,apply};