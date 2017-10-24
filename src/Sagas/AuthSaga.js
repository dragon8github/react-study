import { call, put, takeEvery, select, take, fork, cancel, cancelled } from 'redux-saga/effects'
import actions from '@Actions/CommonAction'
import AuthApi from '@Api/AuthApi'

export default function* () {
    // 定义【 加载菜单 INIT_LOAD_MENU 】任务
    const action = yield take(actions.GetUserAuth().type)
    // ajax
    const result = yield call(AuthApi.getAuthData)
    // 取出成功，调用【SET_USER_AUTH】的reducer
    yield put(actions.SetUserAuth(result))
}