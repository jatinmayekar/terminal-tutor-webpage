import { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Installation from "@/components/Installation";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: "Terminal Tutor - Real-time command education for developers",
  description: "Real-time command education for developers. Learn terminal commands as you type with 1.6ms predictions, natural language ask mode, and safety warnings. Forever Free.",
  canonicalUrlRelative: "/",
});

export default function Page() {
  return (
    <>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <FeaturesAccordion />
        <Installation />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
