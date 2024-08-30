'use client'

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import destinationData from "@/data/popular_destination.json";

function Page() {
  const destinations = [
    {
      title: "Kashmir",
      price: "₹31,499",
      video: "/videos/kashmir.mp4",
      days: [
        {
          day: "Day 1",
          activities: [
            { time: "11:00 AM", description: "Travelling to Srinagar Hotel" },
            { time: "12:00 PM", description: "Check-in at Hotel" },
            { time: "05:00 PM", description: "As the sun sets, casting a warm golden hue, you board the Shikara and embark on a tranquil journey" }
          ]
        },
        {
          day: "Day 2",
          activities: [
            { time: "10:00 AM", description: "Check-out from Hotel" },
            { time: "11:00 AM", description: "Visiting Zero Point on the Srinagar-Leh Highway" },
            { time: "02:00 PM", description: "Exploring Thajiwas Glacier near Sonamarg with wonderful landscapes" },
            { time: "06:00 PM", description: "Check-in to Hotel Mount View / Hotel Country Inn" }
          ]
        },
        {
          day: "Day 3",
          activities: [
            { time: "10:00 AM", description: "Embarking on a Gondola ride in Sonmarg and Gulmarg" },
            { time: "12:00 PM", description: "Wandering amidst the picturesque landscapes of Kashmir, Engaging in snow activities and immersing yourself..." },
            { time: "02:00 PM", description: "Check-out from Hotel" },
            { time: "05:00 PM", description: "Check-in to Hotel" }
          ]
        }
      ]
    },
    {
      title: "Kerala",
      price: "₹39,950",
      video: "/videos/kerala.mp4",
      days: [
        {
          day: "Day 1",
          activities: [
            { time: "10:00 AM", description: "Reach Kochi and have Breakfast" },
            { time: "12:00 PM", description: "Reach Alleppey" },
            { time: "01:00 PM", description: "Check-in to Houseboat and have Lunch" },
            { time: "02:00 PM", description: "Visit water village and afterwards enjoy the hospitality from the houseboat" }
          ]
        },
        {
          day: "Day 2",
          activities: [
            { time: "08:00 AM", description: "Breakfast at houseboat, Check-Out from Hotel and Head to Munnar" },
            { time: "12:00 PM", description: "Check-in to hotel in Munnar and have Lunch" },
            { time: "07:00 PM", description: "Enjoy the traditional Kathakali show" },
            { time: "09:00 PM", description: "Head back to Hotel and enjoy Dinner" }
          ]
        },
        {
          day: "Day 3",
          activities: [
            { time: "03:00 AM", description: "Start early morning for off-roading to Kolukkumalai" },
            { time: "05:00 AM", description: "Enjoy a beautiful sunrise at top. After that visit World Largest Tea Plantation in Kolukkumalai" },
            { time: "08:00 AM", description: "Have breakfast and start returning towards Munnar" },
            { time: "02:00 PM", description: "Head to Thekkady for the next chapter of the adventure" }
          ]
        }
      ]
    },
    {
      title: "Wayanad",
      price: "₹13,376",
      video: "/videos/wayanad.mp4",
      days: [
        {
          day: "Day 1",
          date: "29 September '23",
          activities: [
            { time: "08:00 AM", description: "Reach Calicut also known as Kozhikode" },
            { time: "09:00 AM", description: "Wayanad in Private car (2-3hrs)" },
            { time: "01:00 PM", description: "Check-in to Hotel" },
            { time: "02:00 PM", description: "Eco Park, Sky Park, hidden waterfalls" }
          ]
        },
        {
          day: "Day 2",
          date: "30 September '23",
          activities: [
            { time: "08:00 AM", description: "Hidden caves and forest hike" },
            { time: "01:00 PM", description: "Jeep to Wayanad" },
            { time: "02:00 PM", description: "Ziplining" },
            { time: "04:00 PM", description: "Sunset view at Lakkidi View point" }
          ]
        },
        {
          day: "Day 3",
          date: "1 October '23",
          activities: [
            { time: "08:00 AM", description: "Edakkal Cave" },
            { time: "11:00 AM", description: "Checkout from property" },
            { time: "11:00 AM", description: "Banasura sagar dam boating" },
            { time: "03:00 PM", description: "Depart for Calicut also known as Kozhikode" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Video with Overlay Heading */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-white text-xl md:text-3xl font-semibold mb-2">
            I had a great time here!
          </h2>
          <h1 className="text-white text-3xl md:text-6xl font-bold">
            Come Join me!!
          </h1>
        </div>
      </div>

      {/* Destinations Sections */}
      {destinations.map((destination, index) => (
        <div key={index} className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Experience the Enchanted Beauty of {destination.title}!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Video Card for Destination */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="relative h-48">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                >
                  <source src={destination.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-sm">
                  Selling Fast
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{destination.title}</h2>
                <p className="text-lg font-semibold">{destination.price}</p>
                <p className="text-sm">Per Person (incl. GST)</p>
              </div>
            </div>

            {/* Itinerary Cards for Destination */}
            {destination.days.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{day.day}</h3>
                  {day.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="mb-2">
                      <p className="font-semibold text-sm">{activity.time}</p>
                      <p className="text-xs text-gray-400">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Popular Destinations Section */}
      <div className="bg-black py-12 pt-36">
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Some Popular Destinations ({destinationData.destinations.length})
        </h1>
        <div className="flex flex-wrap justify-center">
          {destinationData.destinations.map((destination) => (
            <CardContainer key={destination.id} className="inter-var m-4">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {destination.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  {destination.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={destination.image}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={destination.title}
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-20">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    Visit now →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                  >
                    Check Out
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;