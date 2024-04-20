import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userRef: {
        type: String,
        required: true,
      },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Snacks', 'Dinner'],
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    reviewDate: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
