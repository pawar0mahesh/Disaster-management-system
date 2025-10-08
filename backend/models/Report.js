import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: { type: [Number], required: true }
  },
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], required: true },
  description: { type: String },
  reporterName: { type: String },
  reporterContact: { type: String },
    photos: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

ReportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("Report", ReportSchema);
export default Report;
