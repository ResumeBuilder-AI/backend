const Redis = require('ioredis');
const { REDIS } = require('../../config');
const { log } = require('../logger');

let redisClient = null;

exports.connect = async () => {
    if(!!redisClient) return;
    try{
        redisClient = new Redis({
            port: REDIS.port,
            host: REDIS.host,
        });
    }catch(e){
        log.error({error: e.toString()}, "redis error")
    }
}

exports.redisClient = redisClient;