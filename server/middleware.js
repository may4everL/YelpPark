const { stateparkSchema, reviewSchema } = require('./schemas')
const StatePark = require('./models/statepark');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login')
    }
    next();
}

module.exports.validateStatePark = (req, res, next) => {

    const { error } = stateparkSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const statepark = await StatePark.findById(id);
    if (!statepark.author.equals(req.user._id)) {
        req.flash('error', 'Not permitted!');
        return res.redirect(`/stateparks/${statepark._id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId, id } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Not permitted!');
        return res.redirect(`/stateparks/${id}`)
    }
    next();
}

module.exports.validateReview = (req, res, next) => {

    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}