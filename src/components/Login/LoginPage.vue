<template>
    <div class="login-page">
        <div class="main-content-login">
            <h2 class="title-number">Kitchen Order</h2>
            <input
                v-model="userName"
                :placeholder="'User Name'"
                class="form-phone-number"
            />
            <div class="text-error" v-if="isClickedButton && !userName">User name is required</div>

            <input
                v-model="password"
                :placeholder="'Password'"
                class="form-phone-number"
                type="password"
            />
            <div class="text-error" v-if="isClickedButton && !password">Password is required</div>

            <div class="list-company">
                <v-select :placeholder="'Select company'" 
                    :options="listCompanyToSelect"
                    v-model="selectedCompany">
                </v-select>
            </div>
            <div class="text-error" v-if="isClickedButton && !selectedCompany">Company is required</div>
            <button @click="login" class="button-verify">Login</button>
        </div>
    </div>
</template>

<script>
import LoginApi from '@/Api/login.api.js'
import { VueSelect } from 'vue-select'
import AppLocalStorage from '@/store/localstorage'
const md5 = require('md5');
const _ = require('lodash');
export default {
    data () {
        return {
            userName: '',
            password: '',
            isClickedButton: false,
            selectedCompany: '',
            listCompanyToSelect: []
        }
    },
    methods: {
        login () {
            this.isClickedButton = true
            const dataUser = {
                Username: this.userName,
                Password: md5(this.password),
                CompanyId: this.selectedCompany.id
            }
            LoginApi.handleLogin(dataUser)
                .then(res => {
                    const infoUser = res.data.Data
                    if (infoUser && !_.isEmpty(infoUser)) {
                        this.showToast('Login Successfully', 'success')
                        AppLocalStorage.setUserToken(infoUser.Token, infoUser)
                        this.$router.push('/')
                    }
                })
                .catch(() => {
                    this.showToast('Something went wrong. Please try again', 'error')
                })
        },
        showToast (message, type) {
            this.$toasted.show(message, {
                type,
                position: 'top-right',
                duration: 3000
            })
        },
        getCompanyList () {
            this.$store.dispatch('application/setShowLoader', true)
            LoginApi.getCompanyList().then(res => {
                this.$store.dispatch('application/setShowLoader', false)
                const companyList = res.data.Data
                this.listCompanyToSelect = companyList.map(el => {
                    return {
                        id: el.Id,
                        label: el.Name
                    }
                })
            })
        }
    },
    mounted() {
        this.getCompanyList();
    },
    components: {
        VueSelect
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
            .title-number {
                font-size: 30px !important;
                letter-spacing: 2px;
            }
            .form-phone-number {
                margin-top: 10%;
                border: 1px solid #fff;
                box-sizing: border-box;
                border-radius: 4px;
                width: 400px;
                height: 50px;
                padding-left: 20px;
                border: 1px solid rgba(60,60,60,.26);
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
        .text-error {
            color: red;
            font-size: 14px;
            padding-top: 10px;
            margin-bottom: 0px;
            width: 100%;
            display: flex;
        }
        .list-company {
            margin-top: 10%;
        }
    }
</style>
