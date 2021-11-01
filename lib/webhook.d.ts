import { Context } from 'koishi';
interface BasicOptions {
    WebHook?: {
        assignee: string;
        sendto: string[];
    };
}
export declare function webhook(ctx: Context, config?: BasicOptions): void;
export {};
