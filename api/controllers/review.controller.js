import Review from '../models/review.model.js';
import express from 'express';
const router = express.Router();


// Create a new review
export const createReview = async (req, res) => {
    try {
        const { userRef, mealType, rating } = req.body;
        const review = new Review({
            userRef,
            mealType,
            rating
        });
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error getting reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get review by ID
export const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        console.error('Error getting review by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update review by ID
export const updateReviewById = async (req, res) => {
    try {
        const { mealType, rating } = req.body;
        const review = await Review.findByIdAndUpdate(req.params.id, { mealType, rating }, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete review by ID
export const deleteReviewById = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

