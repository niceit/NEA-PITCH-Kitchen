module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/standard'],

    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    rules: {
        "indent": ["error", 4],
        'dot-notation': [1]
    },
    ignorePatterns: [
        'bootstrap.min.js'
    ]

}
