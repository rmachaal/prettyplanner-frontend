"use client"

// Import necessary libraries and utilities
import { nFormatter } from "@/lib/utils";
import { kv } from "@vercel/kv";
import dotenv from "dotenv";
import { useEffect, useState } from "react";

// Load environment variables from .env file
dotenv.config();

// Function to fetch data from KV store
const fetchKVData = async () => {
  const kvRestApiUrl = process.env.KV_REST_API_URL;
  const kvRestApiToken = process.env.KV_REST_API_TOKEN;

  if (!kvRestApiUrl || !kvRestApiToken) {
    throw new Error(
      "KV_REST_API_URL and/or KV_REST_API_TOKEN are not defined in environment variables.",
    );
  }

  const response = await fetch(`${kvRestApiUrl}/dbsize`, {
    headers: {
      Authorization: `Bearer ${kvRestApiToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from KV store: ${response.status} - ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data;
};

// GeneratedCount component
export const GeneratedCount = () => {
  const [count, setCount] = useState<number | undefined>(undefined);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countData = await fetchKVData();
        setCount(countData);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // Render the CountDisplay component with the fetched count
  return <CountDisplay count={count} />;
};

// CountDisplay component remains the same
const CountDisplay = ({ count }: { count?: number }) => {
  return (
    <p
      className="mt-4 animate-fade-up text-center text-sm text-gray-500 opacity-0"
      style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
    >
      {count ? nFormatter(count) : "..."} photos generated and counting!
    </p>
  );
};

export default GeneratedCount;
