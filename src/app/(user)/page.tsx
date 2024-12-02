/**
 * Styles don't load properly if we don't use it as a client component
 */
"use client"
import LandingPage from "@/components/LandingPage/LandingPage";

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
