const { options } = require('mongoose');
const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const opts = { toJSON: { virtuals: true } };

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200,h_150');
})

const StateParkSchema = new Schema({
    title: String,
    price: Number,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

StateParkSchema.virtual('properties.popUpMarkUp').get(function () {
    return `
    <strong><a href="/stateparks/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>
    `;
})

StateParkSchema.post('findOneAndDelete', async (park) => {
    if (park) {
        await review.remove({
            _id: { $in: park.reviews }
        })
    }
})

module.exports = mongoose.model('StatePark', StateParkSchema)