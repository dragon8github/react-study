import { call, put, takeEvery, select, take, fork, cancel, cancelled } from 'redux-saga/effects'
import actions from '@Actions/CommonAction'
import MenuApi from '@Api/MenuApi'

export default function* () {
    // 定义【 加载菜单 INIT_LOAD_MENU 】任务
    const action = yield take(actions.LoadMenu().type)
    // ajax
    const result = yield call(MenuApi.getMenuData)
    // 取出成功
    yield put(actions.LoadMenuSUCCESS(result))
}