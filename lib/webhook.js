"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = void 0;
function splitChannel(channelid) {
    var pat = /.*:[0-9]*/;
    var ctn = channelid.split(pat);
    return {
        platform: ctn[0],
        channelid: ctn[1]
    };
}
function webhook(ctx, config) {
    if (config === void 0) { config = {}; }
    var sendto = ['onebot:563727991'];
    //@ts-expect-error
    var mainbot = ctx.getBot('onebot');
    ctx.router.post('/yuque', function (ctxn) {
        var eventBody = ctxn.request.body;
        for (var _i = 0, sendto_1 = sendto; _i < sendto_1.length; _i++) {
            var channel = sendto_1[_i];
            var id = splitChannel(channel).channelid;
            console.log(id);
            mainbot.sendMessage(id, eventBody);
        }
    });
}
exports.webhook = webhook;
