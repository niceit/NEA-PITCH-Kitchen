import AppLocalStorage from '@/store/localstorage'
import Vue from 'vue'

const Application = {
    _afterLoginRouteAlias: '',
    setAfterLoginRoute (alias) {
        Application._afterLoginRouteAlias = alias
    },
    getAfterLoginRouteAlias () {
        let routeAlias = ''
        if (Application._afterLoginRouteAlias) {
            routeAlias = Application._afterLoginRouteAlias
            Application.setAfterLoginRoute('')
        }

        return routeAlias
    },
    showApiError (toasted, response) {
        let message = 'API Error: ' + response.message
        message += typeof response.param !== 'undefined' ? (' | ' + response.param) : ''
        toasted.show(message, {
            type: 'error',
            position: 'bottom-left',
            duration: 3000
        })
    },
    showApiSuccess (toasted, response) {
        const message = response.message
        toasted.show(message, {
            type: 'success',
            position: 'bottom-right',
            duration: 3000
        })
    },
    isApiResponseSuccess (responseData) {
        return responseData.StatusResult.Messages === 'Success'
    },
    isApiHasTokenExpired (responseData) {
        return responseData.StatusResult.Messages === 'Token is incorrect'
    },
    showPriceWithCurrency (price) {
        return AppLocalStorage.getCurrentLocale() === 'en' ? `${price}₪` : `₪${price}`
    },
    showToasted (message, type) {
        Vue.toasted.show(message, {
            type,
            position: 'top-right',
            duration: 3000
        })
    }
}

export default Application
