import mongoose from 'mongoose';

const laundrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enrollment: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    tshirts: {
      type: Number,
      required: true,
    },
    shirts: {
      type: Number,
      required: true,
    },
    pants: {
      type: Number,
      required: true,
    },
    bedsheets: {
      type: Number,
      required: true,
    },
    lowers: {
      type: Number,
      required: true,
    },
    shorts: {
        type: Number,
        required: true,
    },
    towel: {
        type: Number,
        required: true,
    },
    pillowcover: {
      type:  Number,
      required: true,
    },
    kurta: {
      type: Number,
      required: true,
    },
    pajama: {
      type: Number,
      required: true,
    },
    dupatta: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LaundryListing = mongoose.model('Listing', laundrySchema);

export default LaundryListing;
