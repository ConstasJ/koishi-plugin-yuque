import {Context,Session,Logger} from "koishi";
import {updateDB} from "./update";
import {Config} from "./types";

async function cmd(ctx:Context,log:Logger,conf:Config){
    const cmd=ctx.command('yuquepush','语雀推送相关功能',{authority:3});
    cmd.alias('yqps');
    cmd.subcommand('.is','查看该频道是否为语雀推送频道',{authority:3})
        .action(async ({session})=>{
            const rn=await ctx.database.getChannel(session.platform,session.channelId);
            if(rn.yuque==1 || conf.list.includes(`${session.platform}:${session.channelId}`)) return '本频道是语雀推送频道';
            return '本频道不是语雀推送频道';
        })
}

export {cmd};