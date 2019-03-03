import winston from 'winston';

// logger
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

/* eslint-disable no-unused-vars */
export default (err, req, res, next) => {
    logger.error(err.message, err);
    res.status(500).send('someting went wrong');
};
