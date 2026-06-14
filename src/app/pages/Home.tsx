import React from "react";
import { Hero } from "../components/Hero";
import { InteractivePreview } from "../components/InteractivePreview";
import { Features } from "../components/Features";

export function Home() {
  return (
    <>
      <Hero />
      <InteractivePreview />
      <Features />
    </>
  );
}
