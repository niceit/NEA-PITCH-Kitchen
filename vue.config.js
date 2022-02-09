module.exports = {
    publicPath: '/',
    devServer: {
        port: 4200,
        host: '0.0.0.0',
        public: 'localhost'
    },
    pluginOptions: {
        i18n: {
            locale: 'ar',
            fallbackLocale: 'ar',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
}
