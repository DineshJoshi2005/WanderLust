const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.set('view engine', "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

// app.get("/testListing", async(req,res)=>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description:"By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("Sample was Saved");
//     res.send("SuccessFul testing");
    
// });
//INDEX ROUTE

app.get("/listings",async(req,res)=>{
    allListings = await Listing.find({});
    res.render("listings/index.ejs" ,{allListings});
});
//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//NEW LISTING POST ROUTE
app.post("/listings",async(req,res)=>{
    let listing = req.body.listing;
    const list = new Listing(listing);
    await list.save();
    res.redirect("/listings");
});

//EDIT ROUTE
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//PUT REQUEST
app.put("/listings/:id",async(req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});
//DELETE ROUTE
app.delete("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

// SHOW ROUTE
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});


app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});