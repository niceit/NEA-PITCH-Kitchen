import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Configuration from '../Config/config'
import * as AxiosLogger from 'axios-logger'
import { ApiServiceError } from './api.error'
import AppLocalStorage from '@/store/localstorage'
import Application from '@/utils/application.js'
import { PATH } from '@/Api/const.js'
import router from '@/router.js'

const headers = {}

const Api = {
    backend () {
        return Vue.axios
    },
    setCommonHeader (name, value) {
        headers[name] = value
    },
    preparedHeaders () {
        headers['Accept-Language'] = '1'
        headers.Authorization = AppLocalStorage.getUserToken()
        return headers
    },
    init () {
        Vue.use(VueAxios, axios)
        Vue.axios.defaults.baseURL = Configuration.value('apiEndpoint')

        const debug = process.env.NODE_ENV !== 'production'
        Vue.axios.interceptors.request.use((request) => {
            request.headers.common = Object.assign({}, request.headers.common, this.preparedHeaders())

            return debug ? request : AxiosLogger.requestLogger(request)
        }, AxiosLogger.errorLogger)

        Vue.axios.defaults.headers.common = {
            Accept: 'application/json'
        }
    },

    query (resource, params) {
        return Vue.axios.get(resource, {
            params: params
        }).catch(error => {
            throw ApiServiceError.fromApiError(error)
        })
    },

    get (resource) {
        return Vue.axios.get(`${resource}`)
            .then(res => {
                if (Application.isApiHasTokenExpired(res.data)) {
                    AppLocalStorage.removeTokenAndUserData()
                    router.push(PATH.LOGIN)
                    return false
                }
                return res
            }).catch(error => {
                throw ApiServiceError.fromApiError(error)
            })
    },

    post (resource, params) {
        return Vue.axios.post(`${resource}`, params)
            .then(res => {
                if (Application.isApiHasTokenExpired(res.data)) {
                    AppLocalStorage.removeTokenAndUserData()
                    router.push(PATH.LOGIN)
                    return false
                }
                return res
            }).catch(error => {
                throw ApiServiceError.fromApiError(error)
            })
    },

    update (resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params).catch(error => {
            throw ApiServiceError.fromApiError(error)
        })
    },

    put (resource, params) {
        return Vue.axios.put(`${resource}`, params).catch(error => {
            throw ApiServiceError.fromApiError(error)
        })
    },

    delete (resource, data) {
        return Vue.axios.delete(resource, {
            data: data
        }).catch(error => {
            throw ApiServiceError.fromApiError(error)
        })
    }
}

Api.init()

export default Api
