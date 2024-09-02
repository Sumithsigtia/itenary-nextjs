import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface HotelDetailsProps {
  location: string;
  checkinDate: string;
  checkoutDate: string;
}

interface HotelData {
  hotel_name: string;
  hotel_price: string;
  hotel_image: string;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ location, checkinDate, checkoutDate }) => {
  const [hotelData, setHotelData] = useState<HotelData[]>([]);
  const baseUrl = 'https://trademarks-reload-afford-debug.trycloudflare.com';

  const fetchHotelDetails = async () => {
    try {
      const formattedLocation = location.toUpperCase();
  
      const response = await axios.get(`${baseUrl}/get-hotel-details`, {
        params: {
          location: formattedLocation,
          checkin_date: checkinDate,
          checkout_date: checkoutDate,
        },
      });
  
      console.log('Response data:', response.data);
  
      if (Array.isArray(response.data)) {
        setHotelData(response.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setHotelData([]);
      }
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      setHotelData([]);  // Set to an empty array on error
    }
  };
  
  useEffect(() => {
    if (location && checkinDate && checkoutDate) {
      fetchHotelDetails();
    }
  }, [location, checkinDate, checkoutDate]);

  return (
    <div>
      <h2 className='text-2xl font-extrabold py-4 text-center'>Hotels and Stay</h2>
      <ul className='grid grid-cols-3 mx-auto max-w-4xl text-xl font-bold pb-2'>
        <li>Name</li>
        <li>Price</li>
        <li>Preview</li>
      </ul>
      <ul>
        {hotelData.length > 0 ? (
          hotelData.map((hotel, index) => (
            <li key={index} className='grid mx-auto max-w-4xl justify-around grid-cols-3 my-4 items-center'>
              <p>{hotel.hotel_name}</p>
              <p>{hotel.hotel_price}</p>
              <img
                className='rounded hover:scale-110 transition-transform duration-300'
                height={80}
                width={160}
                src={hotel.hotel_image}
                alt={hotel.hotel_name}
              />
            </li>
          ))
        ) : (
          <p>No hotels found</p>
        )}
      </ul>
    </div>
  );
};

export default HotelDetails;
