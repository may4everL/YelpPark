const express = require('express');
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const userControllers = require('../controllers/users');



router.route('/register')
    .get(userControllers.renderRegister)
    .post(catchAsync(userControllers.userRegister));


router.route('/login')
    .get(userControllers.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: ' / login' }), userControllers.userLogin);

router.get('/logout', userControllers.userLogout);

module.exports = router;