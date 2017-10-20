// 新闻
export const NewsReduce = function (state = { newslist : [] }, action)
{
   switch (action.type) {
        case 'GET_NEWS':
            return Object.assign({}, state, { newslist: action.getNews })
        default:
            return state
    }
}

// 评论
export const ReviewReduce = function (state = { content: '', rlist: [] }, action) {
    switch (action.type) {
        // 评论框内容改变
        case 'REVIEW_CONTENT_CHANGE':
            return Object.assign({}, state, { content: action.content  })
        // 加载或重新加载评论成功
        case 'REVIEW_LOAD_SUCCESS':
            return Object.assign({}, state, { rlist: action.reviewdata })
        default:
            return state
    }
}