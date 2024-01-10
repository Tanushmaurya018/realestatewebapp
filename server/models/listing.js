const { Schema, model, Model } = require("mongoose");

const listSchema = new Schema(
  {
    name: {
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
    regularPrice: {
      type: String,
      required: true,
    },
    discountedPrice: {
      type: String,
      required: true,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: Boolean,
      required: true,
    },
    imageURL: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = model("Listing", listSchema);

module.exports = Listing;
