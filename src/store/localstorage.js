import { constants } from '@/constants'

const AppLocalStorage = {
    setUserToken (token, userData) {
        localStorage.setItem('_token', token)
        localStorage.setItem('_userData', JSON.stringify(userData))
    },
    getUserToken () {
        return localStorage.getItem('_token') !== 'undefined' ? localStorage.getItem('_token') : null
    },
    getUserData () {
        const data = localStorage.getItem('_userData')
        return data ? JSON.parse(data) : null
    },
}

export default AppLocalStorage
