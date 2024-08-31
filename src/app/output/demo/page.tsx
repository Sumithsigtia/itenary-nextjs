"use client";
import React, { useEffect, useState } from 'react';
import FlightDetails from './FlightDetails';
import HotelDetails from './HotelDetails';

// Define the type for airportCodes
const airportCodes: Record<string, string> = {
  'delhi': 'DEL',
  'mumbai': 'BOM',
  'bangalore': 'BLR',
  'kolkata': 'CCU',
  'chennai': 'MAA',
  'hyderabad': 'HYD',
  'goa': 'GOI',
  'jaipur': 'JAI',
  'agra': 'AGR',
  'varanasi': 'VNS',
  'lucknow': 'LKO',
  'coimbatore': 'CJB',
  'pune': 'PNQ',
  'amritsar': 'ATQ',
  'indore': 'IDR',
  'bhubaneswar': 'BBI',
  'nagpur': 'NAG',
  'kanpur': 'KNU',
  'trivandrum': 'TRV',
  'guwahati': 'GAU',
  'aurangabad': 'IXU',
  'mysore': 'MYQ',
  'ranchi': 'IXR',
  'bhopal': 'BHO',
  'chandigarh': 'IXC',
  'dehradun': 'DED',
  'puducherry': 'PNY',
  'kullu': 'KUU',
  'shimla': 'SLV',
  'patna': 'PAT',
  'raipur': 'RPR',
  'jodhpur': 'JDH',
  'srinagar': 'SXR',
  'dibrugarh': 'DIB',
  'portblair': 'IXZ',
  'bagdogra': 'IXB',
  'nashik': 'ISK',
  'thiruvananthapuram': 'TRV',
  'vijayawada': 'VGA',
  'madurai': 'IXM',
  'tiruchirappalli': 'TRZ',
  'surat': 'STV',
  'jalgaon': 'JLG',
  'kolhapur': 'KLH',
  'kakinada': 'KAK',
  'hubli': 'HBX',
  'bikaner': 'BKB',
  'gwalior': 'GWL',
  'ujjain': 'UJN',
  'siliguri': 'IXS',
  'jammu': 'IXJ',
  'ludhiana': 'LUH',
  'jabalpur': 'JLR',
  'nanded': 'NDC',
  'trichy': 'TRZ',
  'silchar': 'IXS',
  'nagapattinam': 'NPT',
  'vapi': 'VAPI',
  'latur': 'LTU',
  'bilaspur': 'PAB',
  'rajsamand': 'RJM',
  'sangrur': 'SGR',
  'kota': 'KOTA',
  'ahmedabad': 'AMD',
  'bhilwara': 'BHR',
  'bundi': 'BUND',
  'jalna': 'JLNA',
  'hampi': 'HAMP',
  'hassan': 'HASS',
  'kollam': 'KLM',
  'kottayam': 'KTK',
  'kurukshetra': 'KUR',
  'deoghar': 'DGH',
  'sonpur': 'SON',
  'mangaluru': 'IXE',
  'kanchipuram': 'KAN',
  'sirsa': 'SIR',
  'rewari': 'REW',
  'firozabad': 'FIR',
  'meerut': 'MEER',
  'raebareli': 'RAE',
  'buxar': 'BUX',
  'hazaribagh': 'HAZ',
  'rohtak': 'ROH',
  'ballia': 'BAL',
  'modinagar': 'MOD',
  'shahjahanpur': 'SHAJ',
  'sitapur': 'SIT',
  'aurangabadmaharashtra': 'IXU', // Consider separating 'aurangabad' and 'maharashtra' if needed
  'banswara': 'BAN',
  'daman': 'DAM',
  'dungarpur': 'DUN',
  'sikar': 'SIK',
  'yavatmal': 'YAV',
  'vadodara': 'BDQ',
  'narasapur': 'NAR',
  'pali': 'PALI',
  'keshod': 'KSD',
  'karur': 'KRR',
  'bhagalpur': 'BGU',
  'kolar': 'KOLAR',
  'odisha': 'BBS',
  'faridabad': 'FBD',
  'patiala': 'PTL',
  'baroda': 'BDQ',
  'dhanbad': 'DNB',
  'gaya': 'GAY',
  'jamshedpur': 'JMP',
  'khandwa': 'KWD',
  'kozhikode': 'CCJ',
  'navsari': 'NVS',
  'purnea': 'PUN',
  'rangia': 'RNG',
  'sambalpur': 'SBP',
  'sonipat': 'SONI',
  'suri': 'SURI',
  'tinsukia': 'TSK',
  'warangal': 'WGL',
  'aligarh': 'ALG',
  'anchal': 'ANCH',
  'balasore': 'BLS',
  'bangarapet': 'BGQ',
  'bardhaman': 'BDM',
  'belgaum': 'IXG',
  'bengaluru': 'BLR',
  'bihar': 'PAT',
  'chapra': 'CHP',
  'chhindwara': 'CHH',
  'dahod': 'DHD',
  'dehri': 'DEH',
  'dhamtari': 'DHT',
  'gandhinagar': 'GNR',
  'hajipur': 'HAJ',
  'hindupur': 'HDP',
  'julia': 'JUL',
  'khanpura': 'KNU', // Corrected 'kanpur' duplication
  'khargone': 'KHG',
  'madhubani': 'MBD',
  'manikpur': 'MKP',
  'mau': 'MAU',
  'moradabad': 'MBD',
  'munger': 'MUN',
  'ramgarh': 'RM',
  'saran': 'SAR',
  'siwan': 'SIW',
  'sonbhadra': 'SBN',
  'sultanpur': 'SUT',
  'surguja': 'SUR'
  // Ensure all keys are unique. Remove or rename duplicates as needed.
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