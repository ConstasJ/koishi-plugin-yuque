import { Context } from 'koishi'
import { webhook } from '.'

export * from './webhook'

export const name='yuque'

export function apply(ctx:Context,config){
    ctx.plugin(webhook,config)
}