'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";

const DestinationImage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const dest: any = sessionStorage?.getItem('dest');
    const fetchImage = async () => {
      try {
        console.log("Fetching image for destination:", dest); // Debugging statement
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: `${dest} attraction hd quality`, // More specific query
              client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY, // Ensure this is correctly set in your environment
              per_page: 1,
              orientation: "landscape", // Ensuring the image has the correct orientation
            },
          }
        );

        console.log("API response:", response.data); // Debugging statement
        const image = response.data.results[0]?.urls?.regular;
        console.log("Image URL:", image); // Debugging statement

        setImageUrl(image || "");
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (dest) {
      fetchImage();
    }
  }, []);

  console.log(imageUrl);
  
  return imageUrl ? (
    <img
      src={imageUrl}
      alt='Image not Fetched'
      className="w-full h-64 object-cover rounded-md mb-4"
      style={{  height: '300px' }} // Set the size to 300x1200
    />
  ) : (
    <div className="w-full h-full bg-gray-200 rounded-md mb-4 flex items-center justify-center">
      <p>No image available</p>
    </div>
  );
};

export default DestinationImage;
