const express = require('express');
const router = express.Router();
const secretController = require('../controllers/secretController');

router.use(async (req, res) => {
    if (req.method === 'GET') {
        return secretController.getSecret(req, res);
    }

    if (req.method === 'POST') {
        return secretController.createSecret(req, res);
    }

    res.status(405).send('Method Not Allowed');
});

module.exports = router;