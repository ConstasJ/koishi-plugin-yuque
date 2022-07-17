interface Config {
    token: string,
    list: string[],
}

enum Type {
    UPDATE_DOC = '文档更新',
    CREATE_DOC = '文档发布',
    DELETE_DOC = '文档删除',
    CREATE_COMMENT = '新增评论',
    UPDATE_COMMENT = '更新评论',
    NEW_REVIEW = '新建评审',
    COMPLETE_REVIEW = '完成评审',
    CANCEL_REVIEW = '取消评审',
}

export {Config, Type}