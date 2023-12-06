import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redis from '../config/redis.js';
import Boom from '@hapi/boom';

// Bu sayfa istek atma sıklığını kısıtlıyor

// Create and use the rate limiter
const limiter = rateLimit({
    // Rate limiter configuration
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'Too many API request from this IP, please try again after 15 min.',
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.

    //Redis store configuration
    store: new RedisStore({
        client: redis,
        resetExpiryOnChange: true,
        expiry: 30,
        sendCommand: function (cmd, args) {
            //console.log('Command:', cmd);  // cmd değerini logla
            const validCommands = ['get', 'set', 'hmset','SCRIPT'
             /* Diğer geçerli komutlar buraya eklenebilir */];

            return new Promise((resolve, reject) => {
                if (!validCommands.includes(cmd)) {
                    redis[cmd](...args, (err, reply) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(reply);
                        }
                    });
                } 
                // else {
                //     reject(new Error('Invalid Redis command'));
                // }
            });
        },
    }),

    handler: () => {
        next(Boom.tooManyRequests());
    },
})

export default limiter;