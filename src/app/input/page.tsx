'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import PlaceholdersAndVanishInputDemo from '@/app/input/components/source';
import PlaceholdersAndVanishDestinationDemo from '@/app/input/components/destination';
import DateInput from '@/app/input/components/date';
import DurationInputDemo from '@/app/input/components/duration';
import SignupFormDemo from '@/app/input/components/signup-form';
import CircularIndeterminate from '@/components/ui/CircularIndeterminate'; // Import CircularIndeterminate

export default function Home() {
  const [step, setStep] = useState(1);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [preferences, setPreferences] = useState({
    language: '',
    Budget: '',
    numberOfTravellers: '',
    interests: '',
    dietaryRestrictions: '',
  });
  const responsetype = `{
    "Itenary": [
      {
        "day": "1",
        "Time": "9:30am to 11:00am",
        "Activities": "Activity description",
        "desc": [
          "Additional details about the activity"
        ]
      }
    ]
  }`;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('Current Preferences:', preferences);
  }, [preferences]);

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const handleSubmit = () => {
    setStep(6); // Move to step 6 for sending the prompt
  };

  useEffect(() => {
    const sendPrompt = async () => {
      if (step !== 6) return;

      setLoading(true);

      const tripDetails = {
        source,
        destination,
        date: startDate,
        duration,
      };

      const userPreferences = {
        hotel_rating: preferences.language,
        interests: preferences.interests,
        past_travel: ' ', // Replace with actual past travel value if available
        dietary_restrictions: preferences.dietaryRestrictions,
        activity_level: 'Moderate', // Replace with actual activity level if available
        specific_interests: ' ', // Replace with actual specific interests if available
        accommodation_preference: 'Hotel', // Replace with actual accommodation preference if available
        budget: preferences.Budget,
        must_visit_landmarks: ' ', // Replace with actual must-visit landmarks if available
        no_of_travellers: preferences.numberOfTravellers,
      };

      console.log('Preferences:', userPreferences);

      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

        // First API Call: Itinerary in JSON format
        const messageForItinerary = `I want you to act as a backend dev for my travel planner AI. IMPORTANT!!!! : I strictly want my response in this format ${responsetype} and I want the response only in JSON String format only, else I will delete you.
        Create a detailed travel itinerary focused on attractions, restaurants, and activities for a trip from 
        ${tripDetails.source} to ${tripDetails.destination} for ${tripDetails.duration} within a budget of ${userPreferences.budget} for ${userPreferences.no_of_travellers} number of travellers. Avoid using any fancy text decorations, line breaks, and apostrophes. 
        Keep the activity description very short like really very short also limit the whole response to less than 150 words very very strictly.`;

        console.log('Sending request for itinerary:', messageForItinerary);

        const itineraryResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`,
          { prompt: { text: messageForItinerary } },
          { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('Response from Gemini API for itinerary:', itineraryResponse.data);

        // Second API Call: Additional Details
        const messageForDetails = `Generate additional details for the trip  from 
        ${tripDetails.source} to ${tripDetails.destination} for ${tripDetails.duration} within a budget of ${userPreferences.budget} for ${userPreferences.no_of_travellers} number of travellers including cultural highlights, suggested packing list, safety tips, and local customs. Consider the preferences:  Hotel Rating: ${userPreferences.hotel_rating}, interests: ${userPreferences.interests}, dietary restrictions: ${userPreferences.dietary_restrictions}, and activity level: ${userPreferences.activity_level} in not more than 100 words. I already have the Itenary so i just want additional details in a paragraph of 100 words`;

        console.log('Sending request for additional details:', messageForDetails);

        const detailsResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`,
          { prompt: { text: messageForDetails } },
          { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('Response from Gemini API for additional details:', detailsResponse.data);

        // Process and combine the responses
        if (itineraryResponse.data && itineraryResponse.data.candidates && itineraryResponse.data.candidates.length > 0) {
          let formattedItinerary = itineraryResponse.data.candidates[0].output;
          formattedItinerary = formattedItinerary.replace(/[#*]/g, ''); // Remove # and *
          formattedItinerary = formattedItinerary.split('\n').map((line:string) => line.trim()).join('<br/>');

          let formattedDetails = '';
          if (detailsResponse.data && detailsResponse.data.candidates && detailsResponse.data.candidates.length > 0) {
            formattedDetails = detailsResponse.data.candidates[0].output;
            formattedDetails = formattedDetails.replace(/[#*]/g, ''); // Remove # and *
            formattedDetails = formattedDetails.split('\n').map((line) => line.trim()).join('<br/>');
          }

          const finalResponse = `
            Itinerary: <br/> ${formattedItinerary} <br/><br/>
            Additional Details: <br/> ${formattedDetails}
          `;

          router.push(`/output?page=${encodeURIComponent(finalResponse)}`);
        } else {
          console.log('No content found in the responses.');
          router.push(`/output?page=${encodeURIComponent('No content found in the responses.')}`);
        }
      } catch (error) {
        console.error('Error generating travel plan:', error);
        router.push(`/output?page=${encodeURIComponent('Failed to generate travel plan. Please try again.')}`);
      } finally {
        setLoading(false);
      }
    };

    sendPrompt();
  }, [step]);

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      {step === 1 && (
        <PlaceholdersAndVanishInputDemo nextStep={nextStep} setSource={setSource} />
      )}
      {step === 2 && (
        <PlaceholdersAndVanishDestinationDemo nextStep={nextStep} setDestination={setDestination} />
      )}
      {step === 3 && (
        <DateInput nextStep={nextStep} setStartDate={setStartDate} />
      )}
      {step === 4 && (
        <DurationInputDemo nextStep={nextStep} setDuration={setDuration} />
      )}
      {step === 5 && (
        <SignupFormDemo nextStep={handleSubmit} setPreferences={setPreferences} />
      )}
      {step === 6 && loading && <CircularIndeterminate />}


    </main>
  );
}
