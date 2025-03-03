const express = require("express");
const app = express();
const mongoose = require("mongoose");

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
})

app.listen(8080,()=>{
    console.log("server is listening at port 8080");
})