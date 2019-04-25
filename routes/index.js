let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("index from routes")
    res.render('index', { table_name: 'table_name' });
});

module.exports = router;