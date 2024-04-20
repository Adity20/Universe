import express from 'express';
import { createEvent, deleteEvent, updateEvent, getEvent, getEvents } from '../controllers/event.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createEvent);
router.delete('/delete/:id', verifyToken, deleteEvent);
router.post('/update/:id', verifyToken, updateEvent);
router.get('/get/:id', getEvent);
router.get('/get', getEvents);

export default router;