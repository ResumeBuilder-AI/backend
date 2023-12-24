const { v4: uuidv4 } = require('uuid');

exports.generateUUIDV4 = () => {
    return uuidv4();
}