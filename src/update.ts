import {Context} from "koishi";

async function updateDB(ctx:Context){
    return await ctx.database.getAssignedChannels(['platform','id','yuque']);
}

export {updateDB}