import { logger } from './logger';

/* eslint-disable no-unused-vars */
export default (err, req, res, next) => {
    logger.error(err.message, err);
    res.status(500).send('someting went wrong from SERVER');
};
