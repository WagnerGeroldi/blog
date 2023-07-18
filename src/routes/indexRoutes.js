const router = require("express").Router();

const home = require("../controllers/HomeController");


router.get('/', home.homePage)
router.get('/article/:id', home.articleView)


//exportar
module.exports = router;