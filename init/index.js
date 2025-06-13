const mongoose = require("mongoose");
const Listing = require("../modules/listings");
const initData = require("./data");

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
});

const init=async ()=>{
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("database initiallized");
    }

init();

