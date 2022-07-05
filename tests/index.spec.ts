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