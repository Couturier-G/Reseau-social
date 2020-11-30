const express = require('express');
const router = express.Router();      
const publicationsCtrl = require('../controllers/publications');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/',auth, publicationsCtrl.getAllPublications);
router.post('/publish', auth, multer, publicationsCtrl.publish);
router.get('/:id', auth, publicationsCtrl.getOnePublications);
router.delete('/:id', auth, publicationsCtrl.deletePublication);

module.exports = router;