import { call, put, takeEvery, select, take, fork, cancel, cancelled } from 'redux-saga/effects'
import axios from 'axios'
import qs from 'qs'

class ReviewAPI {
    //第一次加载评论
    static loadReview () {    
       return axios.get('http://localhost:8080/review.php').then(res => res.data)
    }
    //发送评论
    static postReview (content) {
        return axios.get('http://localhost:8080/review.php?review=' + content).then(res => res.data)
    }
}

export const Review_saga_load = function* () {  
  // 定义【加载评论】任务
  const action = yield take('REVIEW_LOAD')
  // ajax：得到评论的数据
  const result = yield call(ReviewAPI.loadReview)
  // dispatch：加载或重新加载评论成功
  yield put({ type: 'REVIEW_LOAD_SUCCESS', reviewdata: result })
}

export const Review_saga_post = function* () {
    while (true) {
        // 定义【提交评论】任务
        const action = yield take('REVIEW_POST')
        // ajax：提交评论
        yield call(function* () {
            const state  = yield select()
            const result = yield call(ReviewAPI.postReview, state.ReviewReduce.content)
            yield put({ type: 'REVIEW_LOAD_SUCCESS', reviewdata: result })
        })
    }
}



