const bcrypt = require('bcrypt');

const checkEncryptedCredential = async (input, stored) => {

    const auth = await bcrypt.compare(input, stored);
    return auth;
};

const encryptCredential = async (val) => {

    const salt = await bcrypt.genSalt();
    const hashed_val = await bcrypt.hash(val, salt);
    return hashed_val
}

module.exports = {
    checkEncryptedCredential,
    encryptCredential
}