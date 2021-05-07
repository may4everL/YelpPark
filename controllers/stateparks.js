const StatePark = require('../models/statepark');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });
const { cloudinary } = require('../cloudinary');


module.exports.showParks = async (req, res) => {
    const parksPerPage = 20;
    const pageQuery = parseInt(req.query.page);
    const pageNumber = pageQuery ? pageQuery : 1;//default as the first page
    StatePark.find({}).skip((parksPerPage * pageNumber) - parksPerPage).limit(parksPerPage).exec(function (err, allParks) {
        StatePark.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("stateparks/index", {
                    stateparks: allParks,
                    current: pageNumber,
                    pages: Math.ceil(count / parksPerPage)
                })
            }
        })
    })

    // const stateparks = await StatePark.find({});
    // res.render('stateparks/index', { stateparks });
}

module.exports.showCreatePage = async (req, res) => {
    res.render('stateparks/new');
}

module.exports.addNewPark = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.statepark.location,
        limit: 1
    }).send();
    const statepark = new StatePark(req.body.statepark);
    statepark.geometry = geoData.body.features[0].geometry;
    statepark.images = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))
    statepark.author = req.user._id;
    await statepark.save();
    //console.log(statepark);
    req.flash('success', "The new park is sucessfully added!");
    res.redirect(`/stateparks/${statepark.id}`);
}

module.exports.showOnePark = async (req, res) => {
    const statepark = await StatePark.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    // console.log(statepark);
    if (!statepark) {
        req.flash('error', 'Cannot find!');
        return res.redirect('/stateparks')
    }
    res.render('stateparks/show', { statepark })
}

module.exports.showUpdatePage = async (req, res) => {
    const statepark = await StatePark.findById(req.params.id);
    if (!statepark) {
        req.flash('error', 'Cannot find!');
        return res.redirect('/stateparks')
    }
    res.render('stateparks/edit', { statepark });
}

module.exports.updatePark = async (req, res) => {
    const { id } = req.params;
    const newpark = await StatePark.findByIdAndUpdate(id, { ...req.body.statepark })
    const images = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }));
    newpark.images.push(...images);
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await newpark.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    await newpark.save()
    req.flash('success', "The park is sucessfully updated!");
    res.redirect(`/stateparks/${newpark._id}`);
}

module.exports.deletePark = async (req, res) => {
    const { id } = req.params;
    await StatePark.findByIdAndDelete(id);
    req.flash('success', "The park is successfully deleted!")
    res.redirect('/stateparks');
}