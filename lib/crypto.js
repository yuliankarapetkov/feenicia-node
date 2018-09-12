const aesjs = require('aes-js');
const sha256 = require('crypto-js/sha256');

const decrypt = (key, iv, text) => {
    const keyBytes = aesjs.utils.hex.toBytes(key);
    const ivBytes = aesjs.utils.hex.toBytes(iv);
    const textBytes = aesjs.utils.hex.toBytes(text);

    const aesCbc = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes);

    const decryptedBytes = aesCbc.decrypt(textBytes);
    const decrypted = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return decrypted.replace(/[^\w\s]/gi, ''); // replaces all special characters added by the padding
};

const encrypt = (key, iv, text) => {
    const keyBytes = aesjs.utils.hex.toBytes(key);
    const ivBytes = aesjs.utils.hex.toBytes(iv);
    const textBytes = aesjs.utils.utf8.toBytes(text);

    const aesCbc = new aesjs.ModeOfOperation.cbc(keyBytes, ivBytes);

    const encryptedBytes = aesCbc.encrypt(aesjs.padding.pkcs7.pad(textBytes));
    const encrypted = aesjs.utils.hex.fromBytes(encryptedBytes);

    return encrypted;
};

const hash = sha256;

module.exports = {
    decrypt,
    encrypt,
    hash
};