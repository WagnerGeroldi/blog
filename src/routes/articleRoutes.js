const router = require("express").Router();

const articleController = require("../controllers/ArticleController");

router.get('/list', articleController.articles)
router.get('/new', articleController.newArticle)
// router.get('/update/:id', articleController.updateViewCategory)
// router.get('/list', articleController.countCategory)
router.post('/save', articleController.saveArticle)
router.post('/delete', articleController.deleteArticle)
// router.post('/update', articleController.updateCategory)


//exportar
module.exports = router;