import express from 'express';
import asyncHandler from '../middleware/asyncHandler';

const router = express.Router();

router.get(
    '/',
    asyncHandler((req, res) => {
        res.status(200).send({
            timestamp: 123123,
            message: 'hello im from express endpoint'
        });
    })
);

export default router;
