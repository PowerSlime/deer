module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "node"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],

        //Disabled
        "linebreak-style": 0,

        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],

        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    }
};