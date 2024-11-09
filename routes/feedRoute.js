const express = require('express');
const {getFeeds, getfeedById,postFeed,feedReply} = require('../controllers/feedController');
const {createUser, login} = require('../controllers/userController');
const router = express.Router();


//feeds route
router.get('/feeds',getFeeds);
router.get('/feeds/:id', getfeedById);
router.post('/feeds/addfeed',postFeed);
router.post('/feeds/:id/reply',feedReply);

//user Routes
router.post('/createuser', createUser);
router.post('/login',login );



module.exports = router;