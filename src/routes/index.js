const router = require("express").Router();

const home = require("./indexRoutes");
const category = require("./categoryRoutes");
const article = require("./articleRoutes");


router.use('/', home)
router.use('/admin/category', category)
router.use('/admin/article', article)


//exportar
module.exports = router;