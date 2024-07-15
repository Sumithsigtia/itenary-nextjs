import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Vortex } from "@/components/ui/vortex";
import { cn } from "@/utils/cn";

interface SignupFormProps {
  nextStep: () => void;
  setPreferences: (preferences: {
    language: string;
    travelStyle: string;
    numberOfTravellers: string;
    interests: string;
    dietaryRestrictions: string;
  }) => void;
}

function SignupFormDemo({ nextStep, setPreferences }: SignupFormProps) {
  const [formData, setFormData] = useState({
    language: "",
    travelStyle: "",
    numberOfTravellers: "",
    interests: "",
    dietaryRestrictions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPreferences(formData); // Update preferences here
    nextStep(); // Move to the next step
  };

  return (
    <div className="w-full h-screen pt-16">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center justify-center w-full h-full"
      >
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="language">Hotel Rating</Label>
              <Input id="language" placeholder="5 star" type="text" value={formData.language} onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="travelStyle">Travel Style</Label>
              <Input id="travelStyle" placeholder="Adventure, Leisure, etc." type="text" value={formData.travelStyle} onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="numberOfTravellers">Number of Travellers</Label>
              <Input id="numberOfTravellers" placeholder="2" type="text" value={formData.numberOfTravellers} onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="interests">Interests</Label>
              <Input id="interests" placeholder="Hiking, Beaches, etc." type="text" value={formData.interests} onChange={handleChange} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
              <Input id="dietaryRestrictions" placeholder="Vegetarian, Vegan, etc." type="text" value={formData.dietaryRestrictions} onChange={handleChange} />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Generate Plan &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </Vortex>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignupFormDemo;
