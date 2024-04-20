import React, { useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events data from the backend API
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const eventData = await response.json();
        // Update the events state with the fetched data
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Call fetchEvents function when the component mounts
    fetchEvents();
  }, []);

  return (
    <div id="main" className="font-sans">
      <div id="heading" className="text-center my-8">
        <h1 className="text-3xl font-bold">Upcoming and Ongoing Events</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {events.map((event, index) => (
          <div key={index} className="eventContainer max-w-sm rounded overflow-hidden shadow-lg m-4">
            <div className="imgContainer">
              {/* Replace with the actual image URL from the event data */}
              <img src={event.imageUrl} alt={event.name} />
            </div>
            <div className="infoContainer p-4">
              <div className="description mb-4">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p>{event.description}</p>
              </div>
              <div className="elem">
                <div className="date mb-2">
                  <p>Date: {event.date}</p>
                </div>
                <div className="venue">
                  <p>Venue: {event.venue}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
