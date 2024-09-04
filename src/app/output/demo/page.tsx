"use client";
import React, { useEffect, useState } from 'react';
import FlightDetails from './FlightDetails';
import HotelDetails from './HotelDetails';

// Define the type for airportCodes
const airportCodes: Record<string, string> = {
  // Indian cities
  'delhi': 'DEL',
  'newdelhi': 'DEL',
  'mumbai': 'BOM',
  'bombay': 'BOM',
  'bengaluru': 'BLR',
  'bangalore': 'BLR',
  'kolkata': 'CCU',
  'calcutta': 'CCU',
  'chennai': 'MAA',
  'madras': 'MAA',
  'hyderabad': 'HYD',
  'goa': 'GOI',
  'jaipur': 'JAI',
  'agra': 'AGR',
  'varanasi': 'VNS',
  'benares': 'VNS',
  'kashi': 'VNS',
  'lucknow': 'LKO',
  'coimbatore': 'CJB',
  'pune': 'PNQ',
  'amritsar': 'ATQ',
  'indore': 'IDR',
  'bhubaneswar': 'BBI',
  'nagpur': 'NAG',
  'kanpur': 'KNU',
  'cawnpore': 'KNU',
  'thiruvananthapuram': 'TRV',
  'trivandrum': 'TRV',
  'guwahati': 'GAU',
  'aurangabad': 'IXU',
  'mysore': 'MYQ',
  'mysuru': 'MYQ',
  'ranchi': 'IXR',
  'bhopal': 'BHO',
  'chandigarh': 'IXC',
  'dehradun': 'DED',
  'puducherry': 'PNY',
  'pondicherry': 'PNY',
  'kullu': 'KUU',
  'shimla': 'SLV',
  'simla': 'SLV',
  'patna': 'PAT',
  'raipur': 'RPR',
  'jodhpur': 'JDH',

  // Global cities
  'newyork': 'JFK',
  'newyorkcity': 'JFK',
  'losangeles': 'LAX',
  'london': 'LHR',
  'paris': 'CDG',
  'tokyo': 'HND',
  'dubai': 'DXB',
  'singapore': 'SIN',
  'hongkong': 'HKG',
  'sydney': 'SYD',
  'melbourne': 'MEL',
  'toronto': 'YYZ',
  'vancouver': 'YVR',
  'sanfrancisco': 'SFO',
  'boston': 'BOS',
  'chicago': 'ORD',
  'miami': 'MIA',
  'lasvegas': 'LAS',
  'madrid': 'MAD',
  'barcelona': 'BCN',
  'rome': 'FCO',
  'milan': 'MXP',
  'amsterdam': 'AMS',
  'berlin': 'BER',
  'moscow': 'SVO',
  'saopaulo': 'GRU',
  'rio': 'GIG',
  'cape': 'CPT',
  'buenosaires': 'EZE',
  'mexicocity': 'MEX',
  'shanghai': 'PVG',
  'beijing': 'PEK',
  'bangkok': 'BKK',
  'seoul': 'ICN',
  'istanbul': 'IST',
  'cairo': 'CAI',
  'athens': 'ATH',
  'lisbon': 'LIS',
  'zurich': 'ZRH',
  'geneva': 'GVA',
  'vienna': 'VIE',
  'brussels': 'BRU',
  'stockholm': 'ARN',
  'oslo': 'OSL',
  'helsinki': 'HEL',
  'warsaw': 'WAW',
  'prague': 'PRG',
  'budapest': 'BUD',
  'bucharest': 'OTP',
  'sofia': 'SOF',
  'dublin': 'DUB',
  'copenhagen': 'CPH',
  'munich': 'MUC',
  'frankfurt': 'FRA',
  'hamburg': 'HAM',
  'porto': 'OPO',
  'valencia': 'VLC',
  'seville': 'SVQ',
  'marrakech': 'RAK',
  'casablanca': 'CMN',
  'antalya': 'AYT',
  'dubrovnik': 'DBV',
  'split': 'SPU',
  'zagreb': 'ZAG',
  'ljubljana': 'LJU',
  'sarajevo': 'SJJ',
  'belgrade': 'BEG',
  'skopje': 'SKP',
  'tirana': 'TIA',
  'kiev': 'KBP',
  'minsk': 'MSQ',
  'tbilisi': 'TBS',
  'baku': 'GYD',
  'yerevan': 'EVN',
  'telaviv': 'TLV',
  'jerusalem': 'TLV',
  'amman': 'AMM',
  'beirut': 'BEY',
  'doha': 'DOH',
  'manama': 'BAH',
  'kuwaitcity': 'KWI',
  'riyadh': 'RUH',
  'jeddah': 'JED',
  'dammam': 'DMM',
  'muscat': 'MCT',
  'abuja': 'ABV',
  'lagos': 'LOS',
  'nairobi': 'NBO',
  'johannesburg': 'JNB',
  'accra': 'ACC',
  'addisababa': 'ADD',
  'kigali': 'KGL',
  'kampala': 'EBB',
  'luanda': 'LAD',
  'windhoek': 'WDH',
  'lusaka': 'LUN',
  'harare': 'HRE',
  'maputo': 'MPM',
  'moroni': 'HAH',
  'antananarivo': 'TNR',
  'mauritius': 'MRU',
  'seychelles': 'SEZ',
  'victoria': 'SEZ',
  'maldives': 'MLE',
  'sri': 'CMB',
  'nepal': 'KTM',
  'bhutan': 'PBH',
  'pakistan': 'ISB',
  'bangladesh': 'DAC',
  'myanmar': 'RGN',
  'thailand': 'BKK',
  'laos': 'VTE',
  'cambodia': 'PNH',
  'vietnam': 'HAN',
  'philippines': 'MNL',
  'indonesia': 'CGK',
  'bali': 'DPS',
  'malaysia': 'KUL',
  'newzealand': 'AKL',
  'fiji': 'NAN',
  'samoa': 'APW',
  'tonga': 'TBU',
  'tahiti': 'PPT',
  'honolulu': 'HNL'
};


// Helper function to get airport code
function getAirportCode(placeName: string): string {
  const formattedPlaceName = placeName.trim().toLowerCase();
  const airportCode = airportCodes[formattedPlaceName];

  if (airportCode) {
    return airportCode;
  } else {
    throw new Error(`Airport code for "${placeName}" not found.`);
  }
}

// Helper function to format the date in 'ddMMyyyy' format
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}

// Helper function to parse duration and remove 'days' if present
function parseDuration(durationStr: string): number {
  const match = durationStr.match(/^(\d+)\s*days?$/i);
  if (match) {
    return Number(match[1]);
  } else {
    throw new Error('Invalid duration format.');
  }
}

// Component
const PricingDetails: React.FC = () => {
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [endDate, setEndDate] = useState<string>(''); // Added state for endDate
  const [error, setError] = useState<string>(''); // State for error messages

  useEffect(() => {
    // Load the details from session storage
    const sou = sessionStorage.getItem('sou') || '';
    const dest = sessionStorage.getItem('dest') || '';
    const stdate = sessionStorage.getItem('stdate') || '';
    const dur = sessionStorage.getItem('dur') || '0 days';

    try {
      if (!sou || !dest || !stdate) {
        throw new Error('Missing required trip details.');
      }

      const sourceCode = getAirportCode(sou);
      const destinationCode = getAirportCode(dest);
      const formattedStartDate = formatDate(new Date(stdate));

      const startDateObj = new Date(stdate);
      if (isNaN(startDateObj.getTime())) {
        throw new Error('Invalid start date format.');
      }

      const durationNum = parseDuration(dur);
      if (durationNum < 0) {
        throw new Error('Invalid duration.');
      }

      const calculatedEndDate = new Date(startDateObj);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + durationNum);
      const formattedEndDate = formatDate(calculatedEndDate);

      setSource(sourceCode);
      setDestination(destinationCode);
      setStartDate(formattedStartDate);
      setDuration(durationNum);
      setEndDate(formattedEndDate);
    } catch (error: any) {
      console.error(error);
      setError(error.message || 'An unexpected error occurred.');
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Pricing Details</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='text-white p-4'>
      <h1 className='text-3xl font-bold mb-4'>Pricing Details</h1>
      <p className='mb-2'>Source Airport Code: {source}</p>
      <p className='mb-2'>Destination Airport Code: {destination}</p>
      <p className='mb-4'>Duration: {duration} days</p>

      {/* Components for flight and hotel details */}
      <FlightDetails source={source} destination={destination} departureDate={startDate} />
      <HotelDetails location={destination} checkinDate={startDate} checkoutDate={endDate} />
    </div>
  );
};

export default PricingDetails;
