const API_BASE = 'http://serti.mx:30080/balder';

const feenicia = {
    apiToken: '',
    apiKey: '',
    apiIv: '',

    userToken: '',
    userKey: '',
    userIv: ''
};

function checkInitialized() {
    const { apiToken, apiKey, apiIv } = feenicia;

    if (!apiToken || !apiKey || !apiIv) {
        throw Error('Please, provide valid app token, key and IV.');
    }
}

module.exports = {
    feenicia,
    API_BASE
};