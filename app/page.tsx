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
  title: "Terminal Tutor - Understand commands as you type",
  description: "Understand commands as you type. Get real-time explanations with risk warnings. Build terminal expertise for life. 1.6ms predictions, 459+ commands. Forever Free.",
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
