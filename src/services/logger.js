const { APP_NAME } = require('../config');
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: APP_NAME});
const {set} = require('lodash');

exports.attachLogger = (req, _, next) => {
    const apiPath = req.path;
    set(req, ['log'], log.child({ apiPath }))
    next()
}

exports.log = log;