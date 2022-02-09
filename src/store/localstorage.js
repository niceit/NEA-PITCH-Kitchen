import { constants } from '@/constants'

const AppLocalStorage = {
    setSelectedCity (city) {
        localStorage.setItem('_city', city)
    },
    getSelectedCity () {
        const city = localStorage.getItem('_city')
        return city || null
    },
    getCurrentLocale () {
        const defaultLocale = constants.defaultLocale
        return localStorage.getItem('currentLanguage') ? localStorage.getItem('currentLanguage') : defaultLocale
    },
    setLocale (locale) {
        localStorage.setItem('currentLanguage', locale)
    },
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
    clearUserToken () {
        localStorage.removeItem('_token')
        localStorage.removeItem('_userData')
    },
    getSavedWelcomeMessage () {
        return localStorage.getItem('_welcome_message') !== 'undefined' ? localStorage.getItem('_welcome_message') : null
    },
    setSaveWelcomeMessage (message) {
        localStorage.setItem('_welcome_message', message)
    }
}

export default AppLocalStorage
