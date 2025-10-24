// Workshop schema for skill-sharing workshops
import mongoose from "mongoose"

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a workshop title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    category: {
      type: String,
      enum: ["coding", "design", "photography", "writing", "music", "other"],
      required: true,
    },
    date: {
      type: Date,
      required: [true, "Please provide a workshop date"],
    },
    capacity: {
      type: Number,
      required: [true, "Please provide workshop capacity"],
      min: 1,
    },
    imageURL: {
      type: String,
      default: "/workshop.png",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved", // Auto-approve for now
    },
  },
  { timestamps: true },
)

export default mongoose.model("Workshop", workshopSchema)
