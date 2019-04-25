const express = require('express');
const router = express.Router();

//Домашняя страница
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;