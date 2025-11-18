import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// COMMAND HISTORY SCHEMA
// Tracks every command prediction/suggestion for stats and leaderboard
const commandHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    command: {
      type: String,
      required: true,
      trim: true,
    },
    // Category: git, docker, aws, k8s, etc.
    category: {
      type: String,
      required: true,
      index: true,
    },
    // Risk level from Terminal Tutor: safe, caution, dangerous
    riskLevel: {
      type: String,
      enum: ["safe", "caution", "dangerous"],
      default: "safe",
    },
    // Type of interaction: prediction, suggestion, ask_mode
    interactionType: {
      type: String,
      enum: ["prediction", "suggestion", "ask_mode"],
      default: "prediction",
    },
    // Whether user actually executed the command (optional tracking)
    executed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true },
  }
);

// Indexes for fast queries
commandHistorySchema.index({ userId: 1, createdAt: -1 }); // User's recent commands
commandHistorySchema.index({ userId: 1, category: 1 }); // User's commands by category
commandHistorySchema.index({ createdAt: -1 }); // Global recent activity

// add plugin that converts mongoose to json
commandHistorySchema.plugin(toJSON);

export default (mongoose.models.CommandHistory ||
  mongoose.model("CommandHistory", commandHistorySchema)) as mongoose.Model<any>;
