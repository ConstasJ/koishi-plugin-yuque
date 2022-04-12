interface Config {
    port?: number,
    list: string[],
}

enum Type {
    UPDATE_DOC = '文档更新',
    CREATE_DOC = '文档发布',
    DELETE_DOC = '文档删除',
}

export {Config,Type}