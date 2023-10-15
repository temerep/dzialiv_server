const Router = require('express');
const router = new Router();
const productController = require('../controllers/ProductController');
const verifyJWT = require('../middleware/verifyJWT');


router.get('/', productController.getAll);
router.post('/', verifyJWT, productController.create);
// router.patch('/:id', verifyJWT, productController.update);
router.delete('/:id', verifyJWT, productController.remove);

module.exports = router;