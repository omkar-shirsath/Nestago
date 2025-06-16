const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Nestago/modules/listings");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


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

//testing database connectivity
// app.get("/testing",(req,res)=>{
//     let newlisting = Listing({
//         title:"my home",
//         description:"availabel for the rent",
//         price:2400,
//         location:"sinnar",
//         country:"India"
//     });

//     newlisting.save();
//     console.log("testing succesful");
//     res.send("successful test");
// })

//ejs basic set up
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

//index rought
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("Listings/index.ejs",{allListings});
})

//new rought
app.get("/listings/new",(req,res)=>{
    res.render("Listings/new");
})
//show rought
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//create rought
app.post("/listings",async(req,res)=>{
    
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    res.redirect("/listings");

})

//update rought 
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("Listings/edit.ejs",{listing});
})

app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/listings/${id}`);
})


//delete rought
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.get("/",(req,res)=>{
    res.send("this is root ");
})

app.listen(8080,()=>{
    console.log("Server is runing on port 8080");
})