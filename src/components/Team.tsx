'use client';
import { WavyBackground } from "./ui/wavy-background";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const teamMembers = [
  {
    id: 1,
    name: 'Sumith Sigtia',
    designation: 'Student at AIML Dept',
    image:
      '/destinations/sumith.jpg',
  },
  {
    id: 2,
    name: 'Vidhan Mehta',
    designation: 'Student at AIML Dept',
    image:
      '/destinations/vidhan.jpg',
  },
  {
    id: 3,
    name: 'Swathi S',
    designation: 'Student at AIML Dept',
    image:
      '/destinations/swathi.jpeg',
  },
  {
    id: 4,
    name: 'Pankaj Kumar',
    designation: 'Student at CSE Dept',
    image:
      '/destinations/Pankaj.jpeg',
  },
  {
    id:5,
    name: 'Mohit S',
    designation : 'Student at AIML Dept',
    image: '/destinations/mohit.jpg',
  },
];

function Team() {
  return (
    <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
      <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">Who Travelled with Us</h2>
        <p className="text-base md:text-lg text-white text-center mb-4">Meet the amazing team members who plan and guide your journeys</p>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
          <AnimatedTooltip items={teamMembers} />
        </div>
      </WavyBackground>
    </div>
  );
}

export default Team;
