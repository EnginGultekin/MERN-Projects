import rateLimit from 'express-rate-limit';
import Boom from '@hapi/boom';
import { logEvents } from './logger.js';

// This function limits user login requests
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window` per minute
    message: 'Too many login attempts from this IP, please try again after a 60 second pause',
    handler: (req, res, next, options) => {
        logEvents(
            `Too Many Requests: ${options.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
            'errLog.log'
        );
        next(Boom.tooManyRequests());
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default loginLimiter;
