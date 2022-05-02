const StatePark = require('../models/statepark');
const Review = require('../models/review')

module.exports.createReview = async (req, res, next) => {
    const park = await StatePark.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    park.reviews.push(review);
    await review.save();
    await park.save();
    //console.log(park);
    req.flash('success', "You created the comment!")
    res.redirect(`/stateparks/${park._id}`);
}

module.exports.deleteReview = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await StatePark.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'The review is successfully deleted!')
    res.redirect(`/stateparks/${id}`);
}