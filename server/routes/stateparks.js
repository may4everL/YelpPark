const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


const catchAsync = require('../utils/catchAsync');
const parkControllers = require('../controllers/stateparks');
const { isLoggedIn, isAuthor, validateStatePark } = require('../middleware')

router.route('/')
    .get(catchAsync(parkControllers.showParks))
    .post(isLoggedIn, upload.array('image'), validateStatePark, catchAsync(parkControllers.addNewPark));

router.get('/new', isLoggedIn, catchAsync(parkControllers.showCreatePage));

router.route('/:id')
    .get(catchAsync(parkControllers.showOnePark))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateStatePark, catchAsync(parkControllers.updatePark))
    .delete(isLoggedIn, isAuthor, catchAsync(parkControllers.deletePark));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(parkControllers.showUpdatePage));

module.exports = router;