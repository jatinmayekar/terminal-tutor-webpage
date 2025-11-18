import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
    },
    image: {
      type: String,
    },
    // Used in the Stripe webhook to identify the user in Stripe and later create Customer Portal or prefill user credit card details
    customerId: {
      type: String,
      validate(value: string) {
        return value.includes("cus_");
      },
    },
    // Used in the Stripe webhook. should match a plan in config.js file.
    priceId: {
      type: String,
      validate(value: string) {
        return value.includes("price_");
      },
    },
    // Used to determine if the user has access to the product—it's turn on/off by the Stripe webhook
    hasAccess: {
      type: Boolean,
      default: false,
    },
    // Terminal Tutor Statistics
    commandUsageCount: {
      type: Number,
      default: 0,
    },
    learningStreak: {
      current: {
        type: Number,
        default: 0,
      },
      longest: {
        type: Number,
        default: 0,
      },
    },
    lastActiveDate: {
      type: Date,
    },
    favoriteCommands: {
      type: [String],
      default: [],
      validate(value: string[]) {
        return value.length <= 10;
      },
    },
    modePreferences: {
      aws: {
        type: Number,
        default: 0,
      },
      docker: {
        type: Number,
        default: 0,
      },
      k8s: {
        type: Number,
        default: 0,
      },
      git: {
        type: Number,
        default: 0,
      },
    },
    leaderboardScores: {
      gitScore: {
        type: Number,
        default: 0,
      },
      dockerScore: {
        type: Number,
        default: 0,
      },
      awsScore: {
        type: Number,
        default: 0,
      },
      k8sScore: {
        type: Number,
        default: 0,
      },
      overallRank: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default (mongoose.models.User || mongoose.model("User", userSchema)) as mongoose.Model<any>;
