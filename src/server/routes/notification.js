import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        timestamp: 123123,
        message: 'hello im from express endpoint'
    });
});

export default router;
