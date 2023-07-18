const router = require("express").Router();

const categoryController = require("../controllers/CategoryController");


router.get('/new', categoryController.newCategory)
router.get('/update/:id', categoryController.updateViewCategory)
router.get('/list', categoryController.countCategory)
router.post('/save', categoryController.saveCategory)
router.post('/delete', categoryController.deleteCategory)
router.post('/update', categoryController.updateCategory)


//exportar
module.exports = router;