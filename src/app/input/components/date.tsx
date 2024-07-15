// date.tsx

import { useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface StepProps {
  nextStep: () => void;
  setStartDate: (startDate: string) => void;
}

function DateInput({ nextStep, setStartDate }: StepProps) {
  const [startDate, setLocalStartDate] = useState(""); // Local state for input value

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalStartDate(e.target.value); // Update local state with user input
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStartDate(startDate); // Set the start date input in the parent state
    nextStep(); // Move to the next step
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="h-[40rem] flex flex-col justify-center items-center px-4">
          <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-white">
            Select your Travel Start Date
          </h2>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 items-center">
            <input
              type="date"
              value={startDate}
              onChange={handleChange}
              className="border-b-2 border-gray-300 bg-transparent outline-none text-2xl text-center text-white p-2"
              required
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Next
            </button>
          </form>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default DateInput;
