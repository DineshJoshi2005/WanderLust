const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

MONGO_URL =  "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    mongoose.connect(MONGO_URL)
}

app.get("/",(req,res)=>{
    res.send("Hi I am Root");
});

app.get("/testListing", async(req,res)=>{
    let sampleListing = new Listing({
        title: "My New Villa",
        description:"By the beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India"
    });
    await sampleListing.save();
    console.log("Sample was Saved");
    res.send("SuccessFul testing");
    
});

app.listen(8080,()=>{
    console.log("server is listening at port 8080");
})