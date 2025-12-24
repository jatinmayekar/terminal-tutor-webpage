"use client";

import { useState, useRef } from "react";
import type { JSX } from "react";
import Image from "next/image";

interface Feature {
  title: string;
  description: string;
  type?: "video" | "image";
  path?: string;
  format?: string;
  alt?: string;
  aspectRatio?: string;
  svg?: JSX.Element;
}

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: "Real-Time Predictions",
    description:
      "Experience instant command suggestions with 1.6ms average response time. Terminal Tutor monitors your keystrokes and provides real-time predictions, descriptions, and safety warnings before you hit Enter. 459+ commands, works offline, automated diagnostics included.",
    type: "image",
    path: "/tt_real_time_predictions.gif",
    alt: "Terminal Tutor showing real-time command predictions with safety warnings",
    aspectRatio: "aspect-[799/124]",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: "Natural Language Ask Mode",
    description:
      "Don't know the command? Just ask in plain English and get instant suggestions powered by OpenAI. Example: 'how to list files' → ls command. Free tier: bring your own API key. Premium: zero-setup AI with no API key needed.",
    type: "image",
    path: "/tt_ask_mode.gif",
    alt: "Terminal Tutor ask mode showing natural language command search",
    aspectRatio: "aspect-[799/124]",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        />
      </svg>
    ),
  },
  {
    title: "Safety Warnings",
    description:
      "Terminal Tutor analyzes every command for risk and warns you before execution. 🟢 SAFE for read-only commands, 🟡 CAUTION for state-changing operations, 🔴 DANGEROUS for destructive commands like rm -rf. Never accidentally delete production again.",
    type: "image",
    path: "/tt_dangerous_commands.gif",
    alt: "Terminal Tutor showing safety warnings for dangerous commands",
    aspectRatio: "aspect-[797/124]",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
  {
    title: "Context-Aware Mode System",
    description:
      "Switch between specialized modes to see only relevant commands: aws-mode, docker-mode, k8s-mode, git-mode, or full-mode. Auto-detection based on project files (Dockerfile, package.json, etc.). Smart filtering for your workflow.",
    type: "image",
    path: "/tt_mode.gif",
    alt: "Terminal Tutor mode system filtering commands by context",
    aspectRatio: "aspect-[800/231]",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
        />
      </svg>
    ),
  },
] as Feature[];

// Horizontal tab button component (no expandable description)
const TabButton = ({
  feature,
  isSelected,
  onClick,
}: {
  feature: Feature;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const { title, svg } = feature;

  return (
    <button
      className={`flex items-center gap-3 px-6 py-4 rounded-lg border-2 transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/10 text-primary"
          : "border-base-300 hover:border-primary/50 text-base-content"
      }`}
      onClick={onClick}
    >
      <span className={`${isSelected ? "text-primary" : ""}`}>{svg}</span>
      <span className={`font-medium ${isSelected ? "font-semibold" : ""}`}>
        {title}
      </span>
    </button>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }: { feature: Feature }) => {
  const { type, path, format, alt, aspectRatio } = feature;
  // Use feature-specific aspect ratio, or default to aspect-video (16:9)
  const aspectClass = aspectRatio || "aspect-video";
  // Full-width layout within container
  const style = `rounded-2xl ${aspectClass} w-full mx-auto`;
  const size = {
    width: 1536,
    height: 864,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-contain object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

// A component to display 2 to 5 features with horizontal tabs.
// By default, the first feature is selected. When a tab is clicked, the media and description update.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState<number>(0);
  const selectedFeature = features[featureSelected];

  return (
    <section
      className="py-16 lg:py-24 max-w-6xl mx-auto bg-base-100"
      id="features"
    >
      <div className="px-8">
        <h2 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-12 lg:mb-16">
          Everything you need to
          <span className="bg-primary text-primary-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap">
            master the terminal
          </span>
        </h2>

        {/* Tab Buttons + Video Side by Side */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
          {/* Tab Buttons - Left Column */}
          <div className="flex flex-col gap-4 lg:w-1/3">
            {features.map((feature, i) => (
              <TabButton
                key={feature.title}
                feature={feature}
                isSelected={featureSelected === i}
                onClick={() => setFeatureSelected(i)}
              />
            ))}
          </div>

          {/* Media Display - Right Column */}
          <div className="lg:w-2/3">
            <Media feature={selectedFeature} key={featureSelected} />
          </div>
        </div>

        {/* Description Below Both */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg text-base-content-secondary leading-relaxed">
            {selectedFeature.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
