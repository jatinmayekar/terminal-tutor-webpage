import { ConfigProps } from "./types/config";

// DaisyUI v5 no longer exports themes directly, using fallback color
const themes = {
  light: {
    primary: "#22c55e", // Terminal green (green-500)
  }
};

const config = {
  // REQUIRED
  appName: "Terminal Tutor",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Real-time command education for developers. Learn terminal commands as you type with 36ms predictions, natural language ask mode, and safety warnings. Forever Free.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "terminaltutor.dev",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // Free Forever tier - no priceId needed
        priceId: "",
        name: "Free Forever",
        description: "Everything you need to master the terminal",
        price: 0,
        priceAnchor: 0,
        isFeatured: true, // Most popular
        features: [
          { name: "Unlimited real-time predictions" },
          { name: "459+ command database" },
          { name: "Mode system (aws, docker, k8s, git)" },
          { name: "Safety warnings (🟢 🟡 🔴)" },
          { name: "Natural language ask mode" },
          { name: "Local stats (7-day history)" },
          { name: "Open source (MIT license)" },
          { name: "No credit card required" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_premium_prod",
        name: "Premium",
        description: "Remove friction. Add superpowers.",
        price: 7,
        priceAnchor: 0,
        features: [
          { name: "Everything in Free, plus:" },
          { name: "Zero-setup AI (no API key needed)" },
          { name: "Global developer leaderboard" },
          { name: "Career stats for LinkedIn/resume" },
          { name: "Unlimited cloud history" },
          { name: "Learning insights & recommendations" },
          { name: "Team command libraries" },
          { name: "Cross-device sync" },
          { name: "Priority support" },
          { name: "Early access to new features" },
        ],
      },
      {
        priceId: "",
        name: "Enterprise",
        description: "Governance, compliance, and control",
        price: 50,
        priceAnchor: 0,
        features: [
          { name: "Everything in Premium, plus:" },
          { name: "IAC governance (Terraform/CloudFormation)" },
          { name: "Approval workflows (Slack/Teams)" },
          { name: "Role-based access control (RBAC)" },
          { name: "Complete audit logs (SOC2, HIPAA)" },
          { name: "SSO/SAML (Okta, Azure AD)" },
          { name: "Team analytics dashboard" },
          { name: "Custom integrations" },
          { name: "Dedicated support (SLA)" },
          { name: "On-premise deployment option" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Terminal Tutor <noreply@terminaltutor.dev>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Terminal Tutor <hello@terminaltutor.dev>`,
    // Email shown to customer if they need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@terminaltutor.dev",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you use any theme other than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users to after a successful login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
  social: {
    // Social media and repository links
    github: "https://github.com/jatinmayekar/terminal-tutor-public",
    pypi: "https://pypi.org/project/terminal-tutor/",
    linkedin: "https://www.linkedin.com/in/jatin-mayekar/",
    twitter: "", // To be added later
    discord: "", // To be added later
  },
} as ConfigProps;

export default config;
