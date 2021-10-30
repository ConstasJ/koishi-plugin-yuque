import { Express } from "express";
import { Context } from 'koishi';

export const name = 'yuque'

interface BasicOptions {
    WebHook?: {
        port: number
    }
}

export function apply(ctx: Context, config: BasicOptions = {}) {

}