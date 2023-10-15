const Router = require('express');
const router = new Router();
const verifyJWT = require('../middleware/verifyJWT');
const sliderController = require('../controllers/SliderController');


router.get('/', sliderController.getAll);
router.post('/', verifyJWT, sliderController.create);
// router.patch('/:id', verifyJWT, productController.update);
router.delete('/:id', verifyJWT, sliderController.remove);

module.exports = router;