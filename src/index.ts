import { Context, Session } from 'koishi';

export const name = 'yuque'

interface BasicOptions {
    WebHook?: {
        assignee: string
        sendto: string[]
    }
}

export function apply(ctx: Context, config: BasicOptions = {}) {
    const sendto = ['onebot:966480341']
    const mainbot = ctx.bots[`onebot:3585366684`];
    ctx.router.post('/yuque', (ctxn) => {
        const eventBody = ctxn.request.body
        for (let channel of sendto) mainbot.sendMessage(channel.slice(7), eventBody)
    })
}