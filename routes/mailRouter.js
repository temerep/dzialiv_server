const Router = require('express');
const router = new Router();
const mailController = require('../controllers/MailController');


router.post('/',  mailController.send);

module.exports = router;