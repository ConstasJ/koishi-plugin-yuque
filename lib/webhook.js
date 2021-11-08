"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.app = void 0;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
function splitChannel(channelid) {
    var pat = /.*:[0-9]*/;
    var ctn = channelid.split(pat);
    return {
        platform: ctn[0],
        channelid: ctn[1]
    };
}
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json);
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
function webhook(ctx, config) {
    if (config === void 0) { config = {}; }
    var sendto = ['onebot:563727991'];
    //@ts-expect-error
    var mainbot = ctx.getBot('onebot');
    exports.app.post('/yuque', function (req, res, next) {
        console.log('Receive Yuque Callback!');
        var eventBody = req.body;
        for (var _i = 0, sendto_1 = sendto; _i < sendto_1.length; _i++) {
            var channel = sendto_1[_i];
            var id = channel.slice(7);
            console.log(id);
            mainbot.sendMessage(id, JSON.stringify(eventBody));
        }
        res.send('200 /r/nCompleted/r/n');
    });
    exports.app.listen(9000, function () {
        console.log('Start Listening Yuque Callback!');
    });
}
exports.webhook = webhook;
