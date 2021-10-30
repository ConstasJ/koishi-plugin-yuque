import { Context } from 'koishi';
import e from "express";
import bodyParser from "body-parser";

const app = e()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

export const name = 'yuque'

interface BasicOptions {
    WebHook?: {
        port: number
    }
}

export function apply(ctx: Context, config: BasicOptions = { WebHook: { port: 9000 } }) {
    let webHook;
    //@ts-expect-error
    const mainbot = ctx.getBot('onebot', '3585366684')
    ctx.on('connect', () => {
        app.listen(config.WebHook.port, () => { })
        app.post('/yuque', (req, res, next) => {
            webHook = {
                id: req.body.id,
                slug: req.body.slug,
                title: req.body.title,
                book_id: req.body.book_id
            }
            mainbot.sendMessage('966480341', JSON.stringify(webHook))
        })
    })
}