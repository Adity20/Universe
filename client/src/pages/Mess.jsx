import React, { useState } from "react";
import { useSelector } from 'react-redux';
import '../css/mess.css'

export default function Mess() {
const { currentUser } = useSelector((state) => state.user);
  const [reviewType, setReviewType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewClick = (type) => {
      setReviewType(type);
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
        const ratingValue = event.target.rating.value;
        if (!ratingValue) {
            throw new Error('Rating is required.');
        }
        const response = await fetch('/api/reviews/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userRef: currentUser._id,
                mealType: reviewType,
                rating: ratingValue  // Use the captured rating value
            })
        });
        if (!response.ok) {
            throw new Error('Failed to submit review');
        }
        console.log('Review submitted successfully');
        setReviewSubmitted(true);
        setShowModal(false);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
};


    return (
        <>
            <div className="container h-full">
                <div id="heading">
                    <h1>Today's Menu</h1>
                </div>
                <div id="menuContainer">
                    <div className="elemContainer">
                        <div className="elem">
                            <h3>Breakfast</h3>
                            <div className="menu">
                                <ol>
                                    <li>Pao Bhaji</li>
                                    <li>Milk</li>
                                    <li>Oats</li>
                                    <li>Banana</li>
                                    <li>Bread (Brown/White) and Jam</li>
                                    <li>Cornflakes</li>
                                </ol>
                            </div>
                        </div>
                        <button onClick={() => handleReviewClick("Breakfast")}>Review Breakfast</button>
                    </div>
                    <div className="elemContainer">
                        <div className="elem">
                            <h3>Lunch</h3>
                            <div className="menu">
                                <ol>
                                    <li>Rice</li>
                                    <li>Soya Keema Matar</li>
                                    <li>Paneer Handi</li>
                                    <li>Sambar</li>
                                    <li>Dal Pancharatan</li>
                                    <li>Roti</li>
                                    <li>Mix Veg Raita</li>
                                </ol>
                            </div>
                        </div>
                        <button onClick={() => handleReviewClick("Lunch")}>Review Lunch</button>
                    </div>
                    <div className="elemContainer">
                        <div className="elem">
                            <h3>Snacks</h3>
                            <div className="menu">
                                <ol>
                                    <li>Bread Pakora</li>
                                    <li>Sweet and Green Chutney</li>
                                    <li>Tea</li>
                                    <li>Tang</li>
                                </ol>
                            </div>
                        </div>
                        <button onClick={() => handleReviewClick("Snacks")}>Review Snacks</button>
                    </div>
                    <div className="elemContainer">
                        <div className="elem">
                            <h3>Dinner</h3>
                            <div className="menu">
                                <ol>
                                    <li>Gatta Curry</li>
                                    <li>Tawa Vegetable</li>
                                    <li>Black Masoor</li>
                                    <li>Steamed Rice</li>
                                    <li>Roti</li>
                                    <li>Sooji Halwa</li>
                                </ol>
                            </div>
                        </div>
                        <button onClick={() => handleReviewClick("Dinner")}>Review Dinner</button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Review {reviewType}</h2>
                        <form onSubmit={handleSubmitReview}>
                            <label htmlFor="rating">Rating:</label>
                            <input className='bg-slate-300' type="number" id="rating" name="rating" min="1" max="5" required />
                            <button type="submit">Submit Review</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
