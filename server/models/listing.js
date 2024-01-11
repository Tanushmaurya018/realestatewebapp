const { Schema, model, Model } = require("mongoose");

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      default: "No description is provided by the owner",
    },
    address: {
      type: String,
      required: true,
    },
    regularprice: {
      type: String,
      required: true,
    },
    discountedprice: {
      type: String,
      required: true,
    },
    bedroom: {
      type: String,
      required: true,
    },
    bathroom: {
      type: String,
      required: true,
    },
    furnished: {
      type: String,
      required: true,
    },
    parking: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    imageURL: {
      type: Array,
      required: false,
    },
    author:{
      type:Schema.Types.ObjectId,
      ref:"User"
    }
  },
  { timestamps: true }
);

const Listing = model("Listing", listSchema);

module.exports = Listing;
