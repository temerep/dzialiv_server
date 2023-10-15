const Router = require('express');
const router = new Router();
const adminRouter = require('./adminRouter');
const productRouter = require('./productRouter');
const serviceRouter = require('./serviceRouter');
const subcategoryRouter = require('./subcategoryRouter');
const sliderRouter = require('./sliderRouter');
const mailRouter = require('./mailRouter');

router.use('/admin', adminRouter);
router.use('/product', productRouter);
router.use('/services', serviceRouter);
router.use('/subcategory', subcategoryRouter);
router.use('/slider', sliderRouter);
router.use('/send-mail', mailRouter);

module.exports = router;