import Link from "next/link";
import { Button } from "./ui/moving-border";

function HeroSection() {
  return (
    <div
      className="relative h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center overflow-hidden mx-auto py-10 md:py-0"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(100%) contrast(100%)' }} // Apply filter here
      >
        <source src="/Travel destinations.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>

      <div className="relative z-20 w-full text-center">
        <h1
          className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold text-white bg-opacity-60 px-4 py-2 rounded-lg inline-block"
        >
          Discover Your Next Adventure
        </h1>
        <p
          className="text-lg md:text-xl text-center text-white font-semibold mt-6 max-w-3xl mx-auto leading-relaxed"
        >
          Plan your perfect trip with our <strong>AI Travel Planner</strong>. 
          Whether you&apos;re looking for adventure, relaxation, 
          or cultural experiences, we&apos;ll help you create an 
          unforgettable journey.
        </p>
        <div className="mt-4">
          <Link href="/input">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Plan Your Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
