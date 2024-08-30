'use client';

import React from "react";

// Define the interface for the expected structure of a single day's activity
interface Activity {
  day: string;
  Time: string;
  Activities: string;
  desc: string[];
}

// Define the structure of the travel data
interface TravelData {
  Itenary: Activity[]; // This should be an array of activities
}

interface TravelPlanTableProps {
  travelData: TravelData; // Ensure this matches the data being passed
}

const TravelPlanTable: React.FC<TravelPlanTableProps> = ({ travelData }) => {
  // Ensure travelData.Itenary is defined and is an array
  if (!Array.isArray(travelData.Itenary)) {
    console.error('Expected travelData.Itenary to be an array');
    return <div className="text-white">Error: Invalid travel data.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto overflow-x-auto">
      <div className="flex flex-col text-white space-y-4">
        <div className="grid grid-cols-1 gap-4 w-full text-white">
          <div className="grid grid-cols-3 p-2 rounded-lg">
            <div className="text-xl font-semibold pl-8">Day</div>
            <div className="text-xl font-semibold">Activities with Description</div>
            <div className="text-xl font-semibold ml-20">Time</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full text-white">
          {travelData.Itenary.map((activity, index) => (
            <div key={index} className="grid grid-cols-3 pl-5 rounded-lg">
              <div className="pl-8">{activity.day}</div>
              <div>
                <div className="text-xl font-semibold">{activity.Activities}</div>
                <div>{activity.desc.join(", ")}</div>
              </div>
              <div className="ml-20">{activity.Time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPlanTable;
