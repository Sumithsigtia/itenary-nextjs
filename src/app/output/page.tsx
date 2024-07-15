"use client";
import React, { Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { SparklesCore } from "@/components/ui/sparkles";

const ResultsPageContent = () => {
  const searchParams = useSearchParams();
  const response = decodeURIComponent(searchParams.get('page') || '');
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
        <h1 className="md:text-1xl text-3xl lg:text-1xl font-bold text-center text-white mb-4">
          Your Travel Plan
        </h1>
        <div dangerouslySetInnerHTML={{ __html: response }} className="w-full text-white"></div>
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
