export default class Passport {
     constructor () {
         this.islogin = false
     }
     ulogin (uname, upass, successCallBack, failCallBack) {
         if (uname === "shenyi" && upass === "123") {
            this.islogin = true
            let successData = {msg: "登录成功", result: "success", resultCode: 1}
            return successCallBack ? successCallBack(successData) : new Promise((resolve, reject) => resolve(successData))
         } else {
            let failData = {msg: "登录失败，密码错误或账号不存在", result: "fail", resultCode: 0}
            return failCallBack ? failCallBack(failData) : new Promise((resolve, reject) => reject(failData))
         }
     }
}