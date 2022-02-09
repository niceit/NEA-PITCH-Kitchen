import dotenv from 'dotenv'

dotenv.config()

export default class Configuration {
    static get CONFIG () {
        return {
            apiEndpoint: '$VUE_APP_API_ENDPOINT',
            aboutUsUrl: '$VUE_APP_ABOUT_US_URL',
            termAndConditionUrl: '$VUE_APP_TERMS_CONDITION_LINK',
            privacyUrl: '$VUE_APP_PRIVACY_URL',
            contactUsUrl: '$VUE_APP_CONTACT_US_URL'
        }
    }

    static value (name) {
        if (!(name in this.CONFIG)) {
            return
        }

        const value = this.CONFIG[name]

        if (!value) {
            return
        }

        if (value.startsWith('$VUE_APP_')) {
            const envName = value.substr(1)
            const envValue = process.env[envName]
            if (envValue) {
                return envValue
            }
        } else {
            return value
        }
    }
}
