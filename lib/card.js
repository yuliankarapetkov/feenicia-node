const rp = require('request-promise');

const { feenicia, API_BASE } = require('./feenicia');
const { decrypt, encrypt, hash } = require('./crypto');
const { validate } = require('./validation');

const {
    INVALID_ARGUMENTS_ERROR,
    UNEXPECTED_ERROR,
} = require('./errors');

const cardProps = [
    'pan',
    'cvv',
    'month',
    'year',
    'pin',
    'cardHolderName'
];

const create = (card, token, key, iv) => {
    validate(feenicia, ['appKey', 'appIv']);
    validate(card, cardProps);
    validate([token, key, iv]);

    const keyDecrypted = decrypt(feenicia.appKey, feenicia.appIv, key);
    const ivDecrypted = decrypt(feenicia.appKey, feenicia.appIv, iv);

    const cardHashed = hash(JSON.stringify(card));

    const cardEncrypted = encrypt(keyDecrypted, ivDecrypted, cardHashed);

    // console.log(`card: ${JSON.stringify(card)}`);
    // console.log(`key: ${keyDecrypted}`);
    // console.log(`iv: ${ivDecrypted}`);
    // console.log(`hashed card: ${cardHashed}`);
    // console.log(`encrypted card: ${cardEncrypted}`);

    return new Promise((resolve, reject) => {
        rp({
            method: 'POST',
            uri: `${API_BASE}/token/generateToken`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'X-Requested-With': cardEncrypted
            },
            body: card,
            json: true
        })
        .then(response => {
            const { card } = response;

            if (!!card) {
                resolve(card);
            } else {
                reject(new Error(INVALID_ARGUMENTS_ERROR));
            }
        })
        .catch(() => {
            reject(new Error(UNEXPECTED_ERROR));
        });
    });
};

const card = {
    create
};

module.exports = card;