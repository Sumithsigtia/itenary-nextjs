import React, { useEffect, useState } from 'react';

interface FlightDetailsProps {
  source: string;
  destination: string;
  departureDate: string;
}

interface FlightData {
  airline: string;
  price: string;
  duration: string;
  stops: string; // Since 'stops' is not provided, you might want to handle this differently
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ source, destination, departureDate }) => {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const baseUrl = 'https://bomb-pressed-sodium-safety.trycloudflare.com';

  const fetchFlightDetails = async () => {
    try {
      const formattedSource = source.toUpperCase();
      const formattedDestination = destination.toUpperCase();

      const response = await fetch(
        `${baseUrl}/get-flight-details?source=${formattedSource}&destination=${formattedDestination}&departure_date=${departureDate}`, 
        {
          method: 'GET',
          headers: {
            'Authorization': 'bearer',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.airlines && data.durations && data.pricing) {
        const combinedData: FlightData[] = data.airlines.map((airline: string, index: number) => ({
          airline: airline,
          price: data.pricing[index],
          duration: data.durations[index],
          stops: 'Not provided' // Since stops are not provided, use a placeholder or handle accordingly
        }));

        setFlightData(combinedData);
      } else {
        console.info('Unexpected data format:', data);
        setFlightData([]); // Clear on unexpected data format
      }
    } catch (error) {
      console.error('Error fetching flight details:', error);
      setFlightData([]);  // Set to an empty array on error
    }
  };

  useEffect(() => {
    if (source && destination && departureDate) {
      fetchFlightDetails();
    }
  }, [source, destination, departureDate]);

  return (
    <div>
      <h2 className='text-2xl font-extrabold py-4 text-center'>Flight Details ✈️</h2>
      <ul className='grid grid-cols-4 mx-auto max-w-4xl text-xl font-bold pb-2'>
        <li>Airline</li>
        <li>Cost</li>
        <li>Duration</li>
      </ul>
      <ul>
        {flightData.length > 0 ? (
          flightData.map((flight, index) => (
            <li key={index} className='grid mx-auto max-w-4xl justify-around grid-cols-4 py-1'>
              <p>{flight.airline}</p>
              <p>{flight.price}</p>
              <p>{flight.duration}</p>
            </li>
          ))
        ) : (
          <p>No flights found</p>
        )}
      </ul>
      <div className='max-w-4xl mx-auto text-sm text-gray-400 mt-6'>
        * All flight costs shown are for 1 Adult.
      </div>
    </div>
  );
};

export default FlightDetails;
