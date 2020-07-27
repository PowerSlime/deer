require("dotenv").config();

const withTM = require("next-transpile-modules")(["lodash-es"]);

const nextConfig = {
    target: "serverless",
    poweredByHeader: false,
    generateEtags: false,
    webpack: (config, { dev }) => {
        if (dev) {
            config.module.rules.push({
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                },
            });
        }

        return config;
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
    },
};

module.exports = withTM(nextConfig);
