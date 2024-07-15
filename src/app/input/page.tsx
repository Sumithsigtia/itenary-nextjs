// page.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import PlaceholdersAndVanishInputDemo from "@/app/input/components/source";
import PlaceholdersAndVanishDestinationDemo from "@/app/input/components/destination";
import DateInput from "@/app/input/components/date";
import DurationInputDemo from "@/app/input/components/duration";
import SignupFormDemo from "@/app/input/components/signup-form";

export default function Home() {
  const [step, setStep] = useState(1);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [preferences, setPreferences] = useState({
    language: "",
    travelStyle: "",
    numberOfTravellers: "",
    interests: "",
    dietaryRestrictions: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const nextStep = () => setStep((prev) => prev + 1);

  const handleSubmit = async () => {
    setLoading(true);

    const tripDetails = {
      source,
      destination,
      date: startDate,
      duration,
    };

    const userPreferences = {
      language_preference: preferences.language,
      interests: preferences.interests,
      past_travel: " ", // Replace with actual past travel value if available
      dietary_restrictions: preferences.dietaryRestrictions,
      activity_level: "Moderate", // Replace with actual activity level if available
      specific_interests: " ", // Replace with actual specific interests if available
      accommodation_preference: "Hotel", // Replace with actual accommodation preference if available
      travel_style: preferences.travelStyle,
      must_visit_landmarks: " ", // Replace with actual must-visit landmarks if available
    };

    console.log("Preferences:", userPreferences);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const message = `
        Create a detailed travel itinerary focused on attractions, restaurants, and activities for a trip from 
        ${tripDetails.source} to ${tripDetails.destination}, starting on ${tripDetails.date}, lasting for 
        ${tripDetails.duration} days, within a moderate budget in INR. This should include daily timings, 
        preferences for ${userPreferences.accommodation_preference} accommodations, a ${userPreferences.travel_style} travel style, 
        and interests in ${userPreferences.interests}. Past travel includes ${userPreferences.past_travel}, dietary restrictions include 
        ${userPreferences.dietary_restrictions}, and the activity level is ${userPreferences.activity_level}. Also, provide a travel checklist relevant to the destination and duration.
      `;

      console.log("Sending request to Gemini API:", message);

      const apiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`,
        {
          prompt: {
            text: message,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from Gemini API:", apiResponse.data);

      if (apiResponse.data && apiResponse.data.candidates && apiResponse.data.candidates.length > 0) {
        let formattedResponse = apiResponse.data.candidates[0].output;
        formattedResponse = formattedResponse.replace(/[#*]/g, ""); // Remove # and *
        formattedResponse = formattedResponse.split("\n").map((line: string) => line.trim()).join("<br/>");
        router.push(`/output?page=${encodeURIComponent(formattedResponse)}`);
      } else {
        console.log("No content found in the response.");
        router.push(`/output?page=${encodeURIComponent("No content found in the response.")}`);
      }
    } catch (error) {
      console.error("Error generating travel plan:", error);
      router.push(`/output?page=${encodeURIComponent("Failed to generate travel plan. Please try again.")}`);
    } finally {
      setLoading(false);
    }
  };

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
      {loading && <p>Loading...</p>}
    </main>
  );
}
