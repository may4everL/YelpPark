const mongoose = require('mongoose');
const cities = require('./cities');
const StatePark = require('../models/statepark.js');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb+srv://weis9004:ll15481548@cluster0.eoh0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

/* mongoose.connect('mongodb://localhost:27017/yelp-statepark', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}) */

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");

})

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDb = async () => {
    await StatePark.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 5;
        const park = new StatePark({
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425813/YelpPark/jasper-van-der-meij-vEDStl1771I-unsplash_nifcsm.jpg',
                filename: 'YelpPark/jasper-van-der-meij-vEDStl1771I-unsplash_nifcsm'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425812/YelpPark/christian-joudrey-mWRR1xj95hg-unsplash_exfe3b.jpg',
                filename: 'YelpPark/christian-joudrey-mWRR1xj95hg-unsplash_exfe3b'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425812/YelpPark/jared-short-eQppl8BZ_s0-unsplash_aiwulz.jpg',
                filename: 'YelpPark/jared-short-eQppl8BZ_s0-unsplash_aiwulz'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606627562/YelpPark/ar7maq2xkim8hdjrkwv0.jpg',
                filename: 'YelpPark/ar7maq2xkim8hdjrkwv0'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425812/YelpPark/des-recits-YsoS7vH3x_I-unsplash_jd9gzu.jpg',
                filename: 'YelpPark/des-recits-YsoS7vH3x_I-unsplash_jd9gzu'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425812/YelpPark/emily-campbell-5oDXo7DM0L4-unsplash_zci1yy.jpg',
                filename: 'YelpPark/emily-campbell-5oDXo7DM0L4-unsplash_zci1yy'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425811/YelpPark/tom_arlkld.jpg',
                filename: 'YelpPark/tom_arlkld'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425811/YelpPark/ashley-knedler-CJBNszfpXW8-unsplash_metoxc.jpg',
                filename: 'YelpPark/ashley-knedler-CJBNszfpXW8-unsplash_metoxc'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425810/YelpPark/adam-jaime-iciBcD8NOeA-unsplash_x7jby2.jpg',
                filename: 'YelpPark/adam-jaime-iciBcD8NOeA-unsplash_x7jby2'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425811/YelpPark/chair_ifsreb.jpg',
                filename: 'YelpPark/chair_ifsreb'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425810/YelpPark/anand-E286myRxrsw-unsplash_bggj8i.jpg',
                filename: 'YelpPark/anand-E286myRxrsw-unsplash_bggj8i'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425809/YelpPark/library-of-congress-ricaZ42ZLlU-unsplash_yxfnpc.jpg',
                filename: 'YelpPark/library-of-congress-ricaZ42ZLlU-unsplash_yxfnpc'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425810/YelpPark/toa_ejiw3w.jpg',
                filename: 'YelpPark/toa_ejiw3w'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425810/YelpPark/tim-golder-ntTWkCHiylI-unsplash_xgtbtj.jpg',
                filename: 'YelpPark/tim-golder-ntTWkCHiylI-unsplash_xgtbtj'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425809/YelpPark/park_tlccfc.jpg',
                filename: 'YelpPark/park_tlccfc'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425809/YelpPark/jeremy-bishop-CTL5ZsGITN8-unsplash_vodca1.jpg',
                filename: 'YelpPark/jeremy-bishop-CTL5ZsGITN8-unsplash_vodca1'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425808/YelpPark/jonas_azkmbh.jpg',
                filename: 'YelpPark/jonas_azkmbh'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425808/YelpPark/rod-ramsell-f33iC8w_aY0-unsplash_vj7etp.jpg',
                filename: 'YelpPark/rod-ramsell-f33iC8w_aY0-unsplash_vj7etp'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1620425808/YelpPark/noaa-LYrERrnJT4E-unsplash_a0ifbw.jpg',
                filename: 'YelpPark/noaa-LYrERrnJT4E-unsplash_a0ifbw'
            }],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand].longitude,
                    cities[rand].latitude
                ]
            },
            price: price,
            description: 'Adipisicing dolor tempor non cillum. Veniam est aliqua labore anim cillum. In officia velit occaecat sint occaecat velit incididunt duis elit in aute. Commodo aliqua in ex amet reprehenderit fugiat eiusmod aute sint exercitation exercitation deserunt ut consectetur. Irure nisi non quis sunt eu sint dolore amet id proident duis irure pariatur magna.',
            author: '5fc0f8a571ce340095fea19d'
        })
        //console.log(park);
        await park.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});