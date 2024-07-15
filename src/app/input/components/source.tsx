"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface StepProps {
  nextStep: () => void;
  setSource: (source: string) => void;
}

function PlaceholdersAndVanishInputDemo({ nextStep, setSource }: StepProps) {
  const [userInput, setUserInput] = useState(""); // Define state variable to store user input
  const [isVanishing, setIsVanishing] = useState(false);

  const placeholders = ["Kashmir", "Coorg", "Shimla", "Bali"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value); // Update state variable with user input
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted", userInput); // Log the user input when form is submitted
    setIsVanishing(true);
    setSource(userInput); // Set the source input in the parent state
    setTimeout(() => {
      nextStep(); // Move to the next step after a delay
    }, 550); // Delay to allow animation to complete
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="h-[40rem] flex flex-col justify-center items-center px-4">
          <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
            Enter your Source location
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
          <div className="mt-4">
            {/* <h3 className="text-lg text-center dark:text-white text-black">Current Input:</h3>
            <p className="text-md text-center dark:text-white text-black">{userInput}</p> */}
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default PlaceholdersAndVanishInputDemo;
