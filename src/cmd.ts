import {Context, Logger} from "koishi";
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
    cmd.subcommand('.add','添加语雀推送频道',{authority:3})
        .action(async ({session})=>{
            try{
                await ctx.database.upsert('channel',[
                    { platform:session.platform,id:session.channelId,yuque:1}
                ]);
                return '设置成功！';
            }catch (e) {
                log.error(e);
                return '出现错误！详情请查看日志';
            }
        });
    cmd.subcommand('.del', '删除语雀推送频道', {authority: 3})
        .action(async ({session})=>{
            try{
                await ctx.database.upsert('channel',[
                    { platform:session.platform,id:session.channelId,yuque:0}
                ]);
                return '设置成功！';
            }catch (e) {
                log.error(e);
                return '出现错误！详情请查看日志';
            }
        })
}

export {cmd};