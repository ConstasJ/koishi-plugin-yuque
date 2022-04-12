import {Context,Session,Logger} from "koishi";

async function cmd(ctx:Context,log:Logger){
    const cmd=ctx.command('yuquepush','语雀推送相关功能',{authority:3});
    cmd.alias('yqps');
    cmd.subcommand('.is','查看该频道是否为语雀推送频道',{authority:3})
        .action(({session})=>{

        })
}

export {cmd};