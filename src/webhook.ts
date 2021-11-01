import { Context } from 'koishi';

interface BasicOptions {
    WebHook?: {
        assignee: string
        sendto: string[]
    }
}
function splitChannel(channelid:string){
    const pat=/.*:[0-9]*/
    const ctn=channelid.split(pat)
    return {
        platform:ctn[0],
        channelid:ctn[1]
    }
}

export function webhook(ctx: Context, config: BasicOptions = {}) {
    const sendto = ['onebot:563727991']
    //@ts-expect-error
    const mainbot = ctx.getBot('onebot')
    ctx.router.post('/yuque', (ctxn) => {
        const eventBody = ctxn.request.body
        for (let channel of sendto){
            const id=splitChannel(channel).channelid
            console.log(id)
            mainbot.sendMessage(id, eventBody)
        }
    })
}