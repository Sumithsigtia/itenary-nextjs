'use client';
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";

const travelPlannerContent = [
  {
    title: 'Personalized Travel Plans',
    description:
      'Our AI Travel Planner creates customized itineraries based on your preferences, ensuring a unique and personalized travel experience tailored just for you.',
  },
  {
    title: 'Expert Recommendations',
    description:
      'Receive expert suggestions for destinations, activities, and dining options, curated from a vast database of travel experiences and reviews.',
  },
  {
    title: 'Comprehensive Itineraries',
    description:
      'Enjoy detailed day-by-day plans that include everything from sightseeing tours to local events, making sure you don’t miss out on anything important.',
  },
  {
    title: 'Real-Time Updates & Support',
    description:
      'Get real-time updates and support throughout your journey, helping you navigate any unexpected changes or challenges with ease.',
  },
  {
    title: 'Cutting-Edge Technology',
    description:
      'Utilize the latest AI technology to streamline your travel planning process, providing you with efficient and accurate recommendations.',
  },
  {
    title: 'Endless Exploration Opportunities',
    description:
      'With our extensive resource library and dynamic recommendations, you’ll always find new places to explore and adventures to embark on.',
  },
];

function WhyChooseUs() {
  return (
    <div className="py-12 bg-gray-900">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">WHY CHOOSE US</h2>
        </div>
      </div>
      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {travelPlannerContent.map((item, index) => (
            <div key={index} className="flex justify-center">
              <BackgroundGradient
                className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                  <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{item.title}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{item.description}</p>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
