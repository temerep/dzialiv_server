const Router = require('express');
const router = new Router();
const verifyJWT = require('../middleware/verifyJWT');
const subcategoryController = require('../controllers/SubcategoryController');


router.get('/', subcategoryController.getAll);
router.post('/', verifyJWT, subcategoryController.create);
// router.patch('/:id', verifyJWT, categoryController.update);
router.delete('/:id', verifyJWT, subcategoryController.remove);

module.exports = router;