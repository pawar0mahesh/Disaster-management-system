import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Hospital", "Shelter", "Police Station", "Rescue Center"], required: true },
  contact: { type: String },
  address: { type: String },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },
  availableBeds: { type: Number, default: 0 },
  availableRescueTeams: { type: Number, default: 0 }
});

// Enable geospatial search
ResourceSchema.index({ location: "2dsphere" });

const Resource = mongoose.model("Resource", ResourceSchema);
export default Resource;
