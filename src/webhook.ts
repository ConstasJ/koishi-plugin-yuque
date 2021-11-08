import bodyParser from 'body-parser';
import express from 'express';
import { Context } from 'koishi';

interface BasicOptions {
    WebHook?: {
        assignee: string
        sendto: string[]
    }
}
function splitChannel(channelid: string) {
    const ctn = channelid.split(':')
    return {
        platform: ctn[0],
        channelid: ctn[1]
    }
}

export const app = express()

app.set('port', process.env.PORT || 9040)
app.use(bodyParser.json)
app.use(bodyParser.urlencoded({ extended: true }))


export function webhook(ctx: Context, config: BasicOptions = {}) {
    const sendto = ['onebot:563727991']
    //@ts-expect-error
    const mainbot = ctx.getBot('onebot')
    app.post('/', (req, res, next) => {
        console.log('Receive Yuque Callback!')
        const eventBody = req.body
        for (let channel of sendto) {
            const id = channel.slice(7)
            console.log(id)
            mainbot.sendMessage(id, JSON.stringify(eventBody))
        }
        res.send({ status: 200 })
    })
    app.listen(app.get('port'), () => {
        console.log('Start Listening Yuque Callback!')
    })
}