import {App} from 'koishi';
import mock from '@koishijs/plugin-mock';
import {apply} from "../src";

const app = new App({
    port: 35565,
})

app.plugin(mock);
app.plugin(apply);

before(async () => {
    await app.start();
})

describe('Yuque push plugin for Koishi.js', () => {
    it('Should correctly get push', async () => {
        await app.http.post('http://localhost:35565/api/yuque', {})
    })
})