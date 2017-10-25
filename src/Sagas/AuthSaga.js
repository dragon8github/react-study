import { call, put, takeEvery, select, take, fork, cancel, cancelled } from 'redux-saga/effects'
import AuthApi from '@Api/AuthApi'

export default function* () {
    // 定义【 GET_USER_AUTH 】任务
    const action = yield take('GET_USER_AUTH')
    // ajax
    const data = yield call(AuthApi.getAuthData)
    // 取出成功 @Reduces/AuthReduce.js
    yield put({ type: 'SET_USER_AUTH', data })
}