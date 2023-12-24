const {redisClient} = require("./index");
const { log } = require('../logger');

exports.set = (key, value, ttl) => {
    if(!redisClient) {
        log.error('redis client not available');
        return;
    };
    if(!ttl){
        return "set cannot be used without ttl";
    }
    return redisClient.set(key, value, "EX", ttl)
    .then(result => {
        return result;
    }).catch(_ => {
        return null;
    })
}

exports.get = (key) => {
    if(!redisClient) {
        log.error('redis client not available');
        return;
    };
    return redisClient.get(key)
    .then(result => {
        return result;
    }).catch(_ => {
        return null;
    })
}