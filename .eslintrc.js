module.exports = {
    root: true,
    env: {
        node: true,
        es2020: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: '11',
        parser: '@babel/eslint-parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV == 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV == 'production' ? 'warn' : 'off',
        'no-param-reassign': ['error', {
            'ignorePropertyModificationsFor': ['Vue', 'state']
        }],
        'no-shadow': ['error', {'allow': ['Vue', 'state']}],
        'no-return-await': 'off',
        'vue/multi-word-component-names': 'off',
    },
};
