import {Context,Session,Logger} from "koishi";
import {updateDB} from "./update";

async function cmd(ctx:Context,log:Logger){
    const cmd=ctx.command('yuquepush','语雀推送相关功能',{authority:3});
    cmd.alias('yqps');
    cmd.subcommand('.is','查看该频道是否为语雀推送频道',{authority:3})
        .action(async ({session})=>{
            const res=await updateDB(ctx);
            for(const r of res){
                if(r.platform===session.platform && r.id===session.id && r.yuque === 1) return '本频道是语雀推送频道';
            }
            return '本频道不是语雀推送频道';
        })
}

export {cmd};