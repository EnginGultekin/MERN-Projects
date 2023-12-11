import expressRedisCache from 'express-redis-cache';
import redis from '../config/redis.js';

const cache = expressRedisCache({
    clien: redis,
    expire: 60,
});

export default cache;