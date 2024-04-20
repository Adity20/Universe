import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import '../css/styles.css';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div id="main">
        <div id="container">
            <div className="contain-left">
                <h1 className='cursor-pointer'>UniVerse</h1>
                <h2 className='cursor-pointer'>Solving all your college related headaches at one place.</h2>
            </div>
            <div className="contain-right">
                <div className="part1">
                    <div className="img-holder" onClick="redirectToEvent()">
                        <img src="./img/events.png" alt=""/>
                        <div className="overlay">
                            <h3>Events</h3>
                        </div>
                        <div className="text">
                            <p>Get a list of all the upcoming and ongoing <br/>events.</p>
                        </div>
                    </div>
                    <div className="img-holder" onClick="redirectToMess()">
                        <img src="./img/Mess.png" alt=""/>
                        <div className="overlay">
                            <h3>Mess</h3>
                        </div>
                        <div className="text">
                            <p>Do not like the food, raise a voice for improving <br/>food quality.</p>
                        </div>
                    </div>
                </div>
                <div className="part2">
                    <div className="img-holder" onClick="redirectToLaundry()">
                        <img src="./img/Laundry.png" alt=""/>
                        <div className="overlay">
                            <h3>Laundry</h3>
                        </div>
                        <div className="text">
                            <p>Still using slips for laundry meh, Just digitalize <br/>the slip.</p>
                        </div>
                    </div>
                    <div className="img-holder" onClick="redirectToBooking()">
                        <img src="./img/eventbook.png" alt=""/>
                        <div className="overlay">
                            <h3>Book <br/>a seat</h3>
                        </div>
                        <div className="text">
                            <p>Not getting seats in events, then prebook your <br/>seats.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
}
