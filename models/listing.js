const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:  String,
        required:true,
    },
    image: {
  filename: String,
  url: {
    type: String,
    default: "https://media.cnn.com/api/v1/images/stellar/prod/111-west-57th-street-quadplex-80-2-credit-to-hayes-davidson.jpg?q=w_1160,c_fill/f_webp",
    set: (v) =>
      v === ""
        ? "https://media.cnn.com/api/v1/images/stellar/prod/111-west-57th-street-quadplex-80-2-credit-to-hayes-davidson.jpg?q=w_1160,c_fill/f_webp"
        : v,
  },
},

    description: String,
    price: Number,
    location: String,
    country:String,
})

const Listing = mongoose.model("Listing", listingSchema)
module.exports =Listing ;

