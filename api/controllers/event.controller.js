import Event from "../models/events.model.js";
import { errorHandler } from "../utils/error.js";


export const createEvent = async (req, res, next) => {
    try {
        const event = await Event.create(req.body);
        return res.status(201).json(event);
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return next(errorHandler(404, 'Event not found!'));
        }
        try {
            await Event.findByIdAndDelete(req.params.id);
            res.status(200).json('Event has been deleted!');
        } catch (error) {
            next(error);
        }
};

export const updateEvent = async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        return next(errorHandler(404, 'Event not found!'));
    }
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        next(error);
    }
};

export const getEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return next(errorHandler(404, 'Event not found!'));
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
}

export const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventsByCategory = async (req, res, next) => {
    try {
        const events = await Event.find({ category: req.params.category });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventsByDate = async (req, res, next) => {
    try {
        const events = await Event.find({ date: req.params.date });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventsByLocation = async (req, res, next) => {
    try {
        const events = await Event.find({ location: req.params.location });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventsByCategoryAndDate = async (req, res, next) => {
    try {
        const events = await Event.find({ category: req.params.category, date: req.params.date });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventsByCategoryAndLocation = async (req, res, next) => {
    try {
        const events = await Event.find({ category: req.params.category, location: req.params.location });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventsByDateAndLocation = async (req, res, next) => {
    try {
        const events = await Event.find({ date: req.params.date, location: req.params.location });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

export const getEventsByCategoryDateAndLocation = async (req, res, next) => {
    try {
        const events = await Event.find({ category: req.params.category, date: req.params.date, location: req.params.location });
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}

