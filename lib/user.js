const rp = require('request-promise');

const { feenicia, API_BASE } = require('./feenicia');
const { validateOptions } = require('./validation');

const { INVALID_TOKEN_ERROR, NO_INTERNET_ERROR } = require('./errors');

const getKeys = () => {
    validateOptions('userToken');

    return new Promise((resolve, reject) => {
        rp({
            method: 'GET',
            uri: `${API_BASE}/auth/getKey`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': feenicia.userToken
            },
            json: true
        })
            .then(response => {
                const { keyVo } = response;

                if (!!keyVo) {
                    resolve(keyVo);
                } else {
                    reject(new Error(INVALID_TOKEN_ERROR));
                }
            })
            .catch(() => {
                reject(new Error(NO_INTERNET_ERROR));
            })
    });
};

const user = {
    // create: function (userId, email) {
    //     const token = feenicia.apiToken;
    //
    //     checkInitialized();
    //
    //     console.log(`token: ${token}`);
    //     console.log(`userId: ${userId}, email: ${email}`);
    // },
    getKeys
};

module.exports = user;