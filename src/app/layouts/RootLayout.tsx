import React from "react";
import { Outlet } from "react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { GlobalSearch } from "../components/GlobalSearch";
import { OnboardingModal } from "../components/OnboardingModal";

export function RootLayout() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0c0c0f", color: "#e0e0da", minHeight: "100vh" }}>
      <Nav />
      <Outlet />
      <Footer />
      <GlobalSearch />
      <OnboardingModal />
    </div>
  );
}
