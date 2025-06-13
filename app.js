const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/Nestago";
async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{
    console.log("database connected");
})
.catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("this is root ");
})

app.listen(8080,()=>{
    console.log("Server is runing on port 8080");
})