const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/landbnb";
const path = require("path");
const methodOverride= require("method-override");
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.send("hi i am root");
});

//INDEX ROUTE //
app.get("/listings",async (req,res)=>{
   const allListing = await Listing.find({});
   res.render("listings/index.ejs", {allListing});
    });

    //CREATE ROUTE//
app.get("/listings/new",(re1,res)=>{
    res.render("listings/new.ejs" )
})

    //SHOW ROUTE //

app.get("/listings/:id",async (req, res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
});

//CREATE ROUTE//
app.post("/listings", async (req,res)=>{
const newListing = new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
});

//EDIT ROUTE//
app.get("/listings/:id/edit", async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})
//UPDATE ROUTE//
app.put("/listings/:id", async (req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect(`/listings/${id}`);
});

//DELETE ROUTE//
app.delete("/listings/:id", async (req,res)=>{
    let {id}= req.params;
    let deletedListing =await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})



// app.get("/testlisting", async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"PentHouse",
//         description:"Middle of Los Angeles",
//         price:4000,
//         location : "Los Angeles",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });

app.listen(8080,()=>{
    console.log("listening to port 8080")
});