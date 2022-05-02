const express = require('express');
const router = express.Router({ mergeParams: true });

const reviewControllers = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const review = require('../models/review');


router.post('/', isLoggedIn, validateReview, catchAsync(reviewControllers.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewControllers.deleteReview))

module.exports = router;