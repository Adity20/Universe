import express from 'express';
const router = express.Router();
import { verifyToken } from '../utils/verifyUser.js';
import { createReview } from '../controllers/review.controller.js';
import { getAllReviews } from '../controllers/review.controller.js';
import { getReviewById } from '../controllers/review.controller.js';
import { updateReviewById } from '../controllers/review.controller.js';
import { deleteReviewById } from '../controllers/review.controller.js';

router.post('/create', verifyToken,createReview);

router.get('/get', verifyToken,getAllReviews);

router.get('/get/:id', verifyToken,getReviewById);

router.put('/update/:id', verifyToken,updateReviewById);

router.delete('/delete/:id', verifyToken,deleteReviewById);

export default router;
