import Api from './api'
import { API_PATH } from './const'

const LoginApi = {
    getCompanyList () {
        return Api.get(API_PATH.GET_COMPANY_LIST)
    },
    handleLogin (data) {
        return Api.post(API_PATH.GET_USER_INFORMATION, data)
    }
}
export default LoginApi
