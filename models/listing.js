const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    image:{
        type: String,
        default: "https://unsplash.com/photos/photography-of-empty-road-and-mountain-during-daytime-rcG2VqAKJdA",
        set: (v)=>v===""?"https://unsplash.com/photos/photography-of-empty-road-and-mountain-during-daytime-rcG2VqAKJdA":v
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;