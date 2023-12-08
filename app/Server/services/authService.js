const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/dbConfig');
const dotenv = require('dotenv');

dotenv.config();

/**
 * @param {Object} user
 * @returns {String}
*/

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
    };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    generateToken
};
