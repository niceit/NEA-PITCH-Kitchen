import Api from './api'

const LoginApi = {
    sendSmsCode (phoneNumber) {
        return Api.post('', {
            request: 'send_sms_code',
            phone_num: phoneNumber,
            country_code: '',
            is_client: true
        })
    },
    resendSmsCode (phoneNumber) {
        return Api.post('', {
            request: 'resend_sms_code',
            phone_num: phoneNumber,
            is_client: true
        })
    },
    verifySMSCode (phoneNumber, verificationCode) {
        return Api.post('', {
            request: 'verify_sms_code',
            phone_num: phoneNumber,
            country_code: '',
            is_client: true,
            verification_code: verificationCode
        })
    },
    _loginWithPhone (authKey) {
        return Api.post('', {
            request: 'login_with_phone',
            auth_key: authKey
        })
    }
}
export default LoginApi
