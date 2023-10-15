const Router = require('express');
const router = new Router();
const adminController = require('../controllers/AdminController');
const verifyJWT = require('../middleware/verifyJWT');


router.post('/registration', adminController.registration);
router.post('/login', adminController.login);
router.get('/auth', verifyJWT, adminController.check);

module.exports = router;