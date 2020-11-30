const express = require('express');
const router = express.Router();      
const commentsCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, commentsCtrl.getAllComments);
router.post('/', auth, multer, commentsCtrl.comment);
router.get('/:id', auth, commentsCtrl.getOneComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;