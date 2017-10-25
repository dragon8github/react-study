import { call, put, takeEvery, select, take, fork, cancel, cancelled } from 'redux-saga/effects'
import MenuApi from '@Api/MenuApi'

export default function* () {
    // 定义【 加载菜单 INIT_LOAD_MENU 】任务
    const action = yield take('INIT_LOAD_MENU')
    // ajax
    const data = yield call(MenuApi.getMenuData)
    // 取出成功，调用@Sagas/MenuSaga.js
    yield put({ type: 'INIT_LOAD_MENU_SUCCESS', data: data })
}