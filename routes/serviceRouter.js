const Router = require('express');
const router = new Router();
const verifyJWT = require('../middleware/verifyJWT');
const serviceController = require('../controllers/ServiceController');


router.get('/', serviceController.getAll);
router.post('/', verifyJWT, serviceController.create);
// router.patch('/:id', verifyJWT, productController.update);
router.delete('/:id', verifyJWT, serviceController.remove);

module.exports = router;