const mongoose = require("mongoose");
const initData = require("./data");
const Listing  = require("../models/listing");
MONGO_URL =  "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    mongoose.connect(MONGO_URL)
}

const initDB = async()=> {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data is saved");
}

initDB();