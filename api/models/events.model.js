import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    imageUrls: {
        type: Array,
        required: true,
      },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;