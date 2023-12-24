const express = require('express');
const { attachLogger } = require('../../services/logger');
const router = express.Router();


router.get('/health', attachLogger, (req, res) => {
    req.log.info('health logger')
    res.send('working')
});



module.exports = router;
