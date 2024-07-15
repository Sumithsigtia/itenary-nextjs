'use client';
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const travelPlannerTestimonials = [
  {
    quote:
      'The AI Travel Planner made my trip effortless and memorable. It curated the perfect itinerary, and I didn’t have to worry about a thing!',
    name: 'John Doe',
    title: 'World Traveler',
  },
  {
    quote:
      "Thanks to the personalized recommendations, I discovered hidden gems I would’ve never found on my own. The AI Travel Planner is a game-changer.",
    name: 'Jane Smith',
    title: 'Adventure Seeker',
  },
  {
    quote:
      "Planning a family vacation was never this easy. The AI Travel Planner considered everyone's preferences and created a fun-filled itinerary.",
    name: 'Emily Johnson',
    title: 'Family Vacationer',
  },
  {
    quote:
      'As a solo traveler, I appreciated the detailed plans and safety tips. The AI Travel Planner ensured I had a great time without any hassles.',
    name: 'Michael Brown',
    title: 'Solo Traveler',
  },
  {
    quote:
      'The AI Travel Planner’s recommendations for restaurants and activities were spot-on. It made our honeymoon truly special.',
    name: 'Chris Wilson',
    title: 'Honeymooner',
  },
];

function TravelPlannerTestimonials() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 z-10">Hear from Our Happy Travelers</h2>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <InfiniteMovingCards
            items={travelPlannerTestimonials}
            direction="left"
            speed="normal"
          />
        </div>
      </div>
    </div>
  );
}

export default TravelPlannerTestimonials;
