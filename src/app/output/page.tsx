'use client';

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SparklesCore } from "@/components/ui/sparkles";
import DestinationImage from "@/app/output/DestinationImage";
import TravelPlanTable from "@/app/output/TravelPlanTable";
import PricingDetails from '@/app/output/demo/page'; // Import PricingDetails component

const capitalizeWords = (text: any) => {
  if (!text) return '';
  return text
    .split(' ')
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const ResultsPageContent = () => {
  const [destination, setDestination] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [travelData, setTravelData] = useState<any | null>(null); // Adjust type as needed
  const [additionalDetails, setAdditionalDetails] = useState<string | null>(null);
  const [additionalDetailsAfter, setAdditionalDetailsAfter] = useState<string | null>(null);
  const [showPricingDetails, setShowPricingDetails] = useState<boolean>(false); // State to control visibility of PricingDetails

  const searchParams = useSearchParams();
  const rawResponse = searchParams.get("page") || "";

  useEffect(() => {
    // Retrieve and set destination and duration from session storage
    const dest = sessionStorage.getItem('dest');
    const dur = sessionStorage.getItem('dur');
    setDestination(dest);
    setDuration(dur);
  }, []);

  useEffect(() => {
    // Clean and parse the response
    console.log("Raw Response:", rawResponse);

    const cleanedResponse = rawResponse
      .replace(/Itinerary:/g, '') // Remove specific text
      .replace(/```json|```|<br\/>/g, '') // Remove unwanted markdown and HTML tags
      .replace(/[\r\n]+/g, '') // Remove newline characters
      .replace(/\s+\{/g, '{'); // Remove whitespace before opening curly braces

    console.log("Cleaned Response:", cleanedResponse);

    // Regular expression to match additional details part
    const detailsMatch = cleanedResponse.match(/Additional Details:(.*)$/); // Added 's' flag for multiline matching
    console.log("Details Match:", detailsMatch);

    const travelDataText = detailsMatch ? detailsMatch[1].trim() : '';

    // Extract content until "Additional Details"
    const contentUntilAdditional = cleanedResponse.split('Additional Details:')[0].trim();
    
    // Extract content after "Additional Details"
    const additionalDetailsAfterText = cleanedResponse.split('Additional Details:')[1]?.trim() || '';

    console.log("Content Until Additional Details:", contentUntilAdditional); // Log for debugging
    console.log("Additional Details After:", additionalDetailsAfterText); // Log for debugging

    // Set additional details
    setAdditionalDetails(travelDataText);
    setAdditionalDetailsAfter(additionalDetailsAfterText);

    // Parse the contentUntilAdditional if it's in JSON format
    try {
      const parsedTravelData = JSON.parse(contentUntilAdditional);
      if (parsedTravelData.Itenary) {
        setTravelData(parsedTravelData);
      } else {
        console.error("Invalid travel data structure");
      }
    } catch (error) {
      console.error("Error parsing travel data:", error);
    }

  }, [rawResponse]);

  if (!travelData) {
    return <div className="text-white">Failed to load travel plan data.</div>;
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden rounded-md">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-20 w-full h-full overflow-y-auto p-4">
        <DestinationImage />
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Your Travel Plan
        </h1>
        <div className="py-5 flex justify-center text-center font-bold text-lg text-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
              </svg>
              <span>{capitalizeWords(destination)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-event"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M16 3l0 4" />
                <path d="M8 3l0 4" />
                <path d="M4 11l16 0" />
                <path d="M8 15h2v2h-2z" />
              </svg>
              <span>{capitalizeWords(duration)} </span>
            </div>
          </div>
        </div>
        <TravelPlanTable travelData={travelData} />
        <button
          onClick={() => window.print()} // Add this line to trigger the print functionality
          className="mt-4 ml-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Print Your Itenary
        </button>
        {additionalDetails && (
          <div className="text-white mt-4">
            <h2 className="text-xl font-bold mb-2">Additional Details</h2>
            <p dangerouslySetInnerHTML={{ __html: additionalDetails }} />
          </div>
        )}
        <button
          onClick={() => setShowPricingDetails(!showPricingDetails)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showPricingDetails ? 'Hide Pricing Details' : 'Show Pricing Details'}
        </button>
        {showPricingDetails && <PricingDetails />}
      </div>
    </div>
  );
};

const ResultsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsPageContent />
    </Suspense>
  );
};

export default ResultsPage;
