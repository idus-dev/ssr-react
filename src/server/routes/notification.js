import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            timestamp: 123123,
            message: 'hello im from express endpoint'
        });
    } catch (err) {
        throw new Error(err);
    }
});

export default router;
