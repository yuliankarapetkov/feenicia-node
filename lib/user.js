const rp = require('request-promise');

const { feenicia, API_BASE } = require('./feenicia');
const { validate } = require('./validation');

const {
    INVALID_ARGUMENTS_ERROR,
    INVALID_AUTH_TOKEN_ERROR,
    UNEXPECTED_ERROR,
} = require('./errors');

const create = (userId, email) => {
    validate(feenicia, ['appToken']);
    validate([userId, email]);

    return new Promise((resolve, reject) => {
        rp({
            method: 'POST',
            uri: `${API_BASE}/auth/signup`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                userId,
                email,
                tokenAplic: feenicia.appToken
            },
            json: true
        })
        .then(response => {
            const { token } = response;

            if (!!token) {
                resolve(token);
            } else {
                reject(new Error(INVALID_ARGUMENTS_ERROR));
            }
        })
        .catch(() => {
            reject(new Error(UNEXPECTED_ERROR));
        });
    });
};

const getKeys = (token) => {
    validate(token);

    return new Promise((resolve, reject) => {
        rp({
            method: 'GET',
            uri: `${API_BASE}/auth/getKey`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            json: true
        })
        .then(response => {
            const { keyVo } = response;

            if (!!keyVo) {
                resolve(keyVo);
            } else {
                reject(new Error(INVALID_AUTH_TOKEN_ERROR));
            }
        })
        .catch(() => {
            reject(new Error(UNEXPECTED_ERROR));
        });
    });
};

const user = {
    create,
    getKeys
};

module.exports = user;