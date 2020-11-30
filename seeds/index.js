const mongoose = require('mongoose');
const cities = require('./cities');
const StatePark = require('../models/statepark.js');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://weis9004:ll15481548@cluster0-shard-00-00-eoh0m.mongodb.net:27017,cluster0-shard-00-01-eoh0m.mongodb.net:27017,cluster0-shard-00-02-eoh0m.mongodb.net:27017/yelppark?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
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
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606624226/YelpPark/w24mufutksrhn9orviwa.jpg',
                filename: 'YelpPark/w24mufutksrhn9orviwa'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606624227/YelpPark/nx8q6ajekcquj3tpbrs2.jpg',
                filename: 'YelpPark/nx8q6ajekcquj3tpbrs2'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606627561/YelpPark/o1wuj06gb3bpy0bienol.jpg',
                filename: 'YelpPark/o1wuj06gb3bpy0bienol'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606627562/YelpPark/ar7maq2xkim8hdjrkwv0.jpg',
                filename: 'YelpPark/ar7maq2xkim8hdjrkwv0'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606627563/YelpPark/zwijspkavyslzfkpsxhv.jpg',
                filename: 'YelpPark/zwijspkavyslzfkpsxhv'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606627564/YelpPark/c7pbzi1eura64rxj8vn5.jpg',
                filename: 'YelpPark/c7pbzi1eura64rxj8vn5'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606627564/YelpPark/wfwtpncdrmcg0qbitwnc.jpg',
                filename: 'YelpPark/wfwtpncdrmcg0qbitwnc'
            },
            {
                url:
                    'https://res.cloudinary.com/dpeqtgy2k/image/upload/v1606627566/YelpPark/yaqlzwbxpmykqa6hefas.jpg',
                filename: 'YelpPark/yaqlzwbxpmykqa6hefas'
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