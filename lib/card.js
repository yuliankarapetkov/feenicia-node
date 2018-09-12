const rp = require('request-promise');

const { feenicia, API_BASE } = require('./feenicia');
const { decrypt, encrypt, hash } = require('./crypto');
const { validateOptions, validateCard } = require('./validation');

const create = (card) => {
    validateCard(card);
    validateOptions('apiIv', 'apiKey', 'userToken', 'userIv', 'userKey');

    const keyDecrypted = decrypt(feenicia.apiKey, feenicia.apiIv, feenicia.userKey);
    const ivDecrypted = decrypt(feenicia.apiKey, feenicia.apiIv, feenicia.userIv);

    const cardHashed = hash(JSON.stringify(card));

    const cardEncrypted = encrypt(keyDecrypted, ivDecrypted, cardHashed);

    console.log(`card: ${JSON.stringify(card)}`);
    console.log(`key: ${keyDecrypted}`);
    console.log(`iv: ${ivDecrypted}`);
    console.log(`hashed card: ${cardHashed}`);
    console.log(`encrypted card: ${cardEncrypted}`);

    return new Promise((resolve, reject) => {
        rp({
            method: 'POST',
            uri: `${API_BASE}/token/generateToken`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': feenicia.userToken,
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
                reject(new Error('Invalid request'));
            }
        })
        .catch(() => {
            reject(new Error('An unexpected error occurred. Please try again'));
        })
    });
};

const card = {
    create
};

module.exports = card;