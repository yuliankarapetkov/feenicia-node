const { feenicia } = require('./feenicia');

const {
    INVALID_APP_TOKEN_ERROR,
    INVALID_APP_IV_ERROR,
    INVALID_APP_KEY_ERROR,

    INVALID_USER_TOKEN_ERROR,
    INVALID_USER_IV_ERROR,
    INVALID_USER_KEY_ERROR,

    INVALID_CARD_ERROR,
    MISSING_CARD_PROPERTIES_ERROR
} = require('./errors');

const feeniciaPropsErrors = {
    apiToken: INVALID_APP_TOKEN_ERROR,
    apiKey: INVALID_APP_IV_ERROR,
    apiIv: INVALID_APP_KEY_ERROR,

    userToken: INVALID_USER_TOKEN_ERROR,
    userKey: INVALID_USER_IV_ERROR,
    userIv: INVALID_USER_KEY_ERROR
};

const cardProps = [
    'pan',
    'cvv',
    'month',
    'year',
    'pin',
    'cardHolderName'
];

function validateOptions() {
    for (let i = 0; i < arguments.length; i++) {
        const prop = arguments[i];

        if (!!feeniciaPropsErrors[prop] && !feenicia[prop]) {
            throw Error(feeniciaPropsErrors[prop]);
        }
    }
};

const validateCard = (card) => {
    if (!card) {
        throw Error(INVALID_CARD_ERROR);
    }

    let missingProps = [];

    for (let i = 0; i < cardProps.length; i++) {
        let prop = cardProps[i];

        if (!card[prop]) {
            missingProps.push(prop);
        }
    }

    if (!!missingProps.length) {
        throw Error(MISSING_CARD_PROPERTIES_ERROR + missingProps.join(', '));
    }
};

module.exports = {
    validateOptions,
    validateCard
};
