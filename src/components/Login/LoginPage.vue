<template>
    <div class="login-page">
        <div v-if="currentStatus === stringPhoneNumber" class="main-content-login">
            <h2 class="title-number" v-text="$t('login.enterPhoneNumber')"></h2>
            <input
                @keypress="isNumber($event)"
                v-model="phoneNumber"
                :placeholder="$t('login.phoneNumberPlaceholder')"
                class="form-phone-number"
            />
            <button :disabled="!phoneNumber" @click="sendVerificationCodeToPhoneNumber" class="button-verify" v-text="$t('login.verifyCode')"></button>
        </div>
        <div v-if="currentStatus === stringVerifyCode" class="main-content-login">
            <h2 class="title-number" v-text="$t('login.enterVerifyCode')"></h2>
            <CodeInput @complete="onCompleteCodeInput" :fields="4"></CodeInput>
            <p class="receive-code-again" v-text="$t('login.resend')" @click="resendSmsCode"></p>
        </div>
    </div>
</template>

<script>
import CodeInput from 'vue-verification-code-input'
import LoginApi from '@/Api/login.api.js'
import AppLocalStorage from '@/store/localstorage'
import AppHelper from '@/utils/application'
import Application from "@/utils/application";
export default {
    data () {
        return {
            phoneNumber: '',
            currentStatus: 'phone-number',
            stringPhoneNumber: 'phone-number',
            stringVerifyCode: 'verify-code',
            maxLength: 4
        }
    },
    components: {
        CodeInput
    },
    methods: {
        isNumber (evt) {
            const charCode = (evt.which) ? evt.which : evt.keyCode
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault()
            } else {
                return true
            }
        },
        sendVerificationCodeToPhoneNumber () {
            this.$store.dispatch('application/setShowLoader', true)
            LoginApi.sendSmsCode(this.phoneNumber)
                .then(res => {
                    if (res.data.message === 'success') {
                        this.currentStatus = this.stringVerifyCode
                    }
                    this.$store.dispatch('application/setShowLoader', false)
                })
        },
        handleVerifySmsCode (valueVerifySmsCode) {
            this.$store.dispatch('application/setShowLoader', true)
            LoginApi.verifySMSCode(this.phoneNumber, valueVerifySmsCode)
                .then(res => {
                    this.$store.dispatch('application/setShowLoader', false)
                    if (AppHelper.isApiResponseSuccess(res.data)) {
                        this.$store.dispatch('register/setAuthKeyFromVerifySMS', res.data.auth_key)
                        if (!res.data.is_registered) {
                            this.$store.dispatch('register/setPhoneNum', this.phoneNumber)
                            this.$router.push('/register')
                        } else {
                            this._loginWithPhone()
                        }
                    } else {
                        AppHelper.showApiError(this.$toasted, res.data)
                    }
                })
        },
        _loginWithPhone () {
            this.$store.dispatch('application/setShowLoader', true)
            LoginApi._loginWithPhone(this.$store.state.register.authKey).then(res => {
                this.$store.dispatch('application/setShowLoader', false)
                if (AppHelper.isApiResponseSuccess(res.data)) {
                    AppLocalStorage.setUserToken(res.data.token, res.data)
                    const afterLoginRoute = Application.getAfterLoginRouteAlias()
                    this.$router.push(afterLoginRoute || '/')
                } else {
                    AppHelper.showApiError(this.$toasted, res.data)
                }
            })
        },
        onCompleteCodeInput (value) {
            this.handleVerifySmsCode(value)
        },
        resendSmsCode () {
            this.$store.dispatch('application/setShowLoader', true)
            LoginApi.resendSmsCode(this.phoneNumber)
                .then(res => {
                    if (AppHelper.isApiResponseSuccess(res.data)) {
                        AppHelper.showApiSuccess(this.$toasted, res.data)
                    } else {
                        AppHelper.showApiError(this.$toasted, res.data)
                    }
                    this.$store.dispatch('application/setShowLoader', false)
                })
        }
    },
    watch: {
        verifyCode (value) {
            if (value.length === this.maxLength) {
                this.handleVerifySmsCode(value)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .login-page {
        width: 100%;
        height: 100vh;
        background: #F0F5F9;
        display: flex;
        justify-content: center;
        align-items: center;
        .main-content-login {
            display: flex;
            flex-direction: column;
            align-items: center;
            .title-number {
                font-size: 30px !important;
                letter-spacing: 2px;
            }
            .form-phone-number {
                margin-top: 10%;
                border: 1px solid #fff;
                box-sizing: border-box;
                border-radius: 40px;
                width: 400px;
                height: 56px;
                padding-right: 20px;
            }
            .button-verify {
                margin-top: 20px;
                width: 400px;
                height: 56px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 20px;
                background: linear-gradient(270deg, #EE5019 0%, #EA9F49 100%);
                border-radius: 40px;
                cursor: pointer;
                border: none;
                &:disabled {
                    opacity: 0.6;
                }
            }
            .receive-code-again {
                margin-top: 20px;
                font-size: 18px;
                cursor: pointer;
                color: #6C6E6F;
                text-decoration: underline;
            }
        }
    }
</style>
