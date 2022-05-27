const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const { NODE_ENV } = process.env;
const _envPath = NODE_ENV === 'production' ? '.env.production' : '.env.development';
const envPath = path.join(__dirname, _envPath);
const env = dotenv.parse(fs.readFileSync(envPath));

for (const it in env) {
    process.env[it] = env[it];
}

const { SUMMONER_API_URL } = process.env;

const moduleExports = {
    cssModules: true,
    serverRuntimeConfig: {
        SUMMONER_API_URL,
    },
    publicRuntimeConfig: {
        SUMMONER_API_URL,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        });
        return config;
    },
};

module.exports = moduleExports;
