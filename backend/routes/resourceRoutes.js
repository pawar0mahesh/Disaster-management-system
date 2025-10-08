import express from "express";
import Resource from "../models/Resource.js";

const router = express.Router();

// ➕ Add a new resource
router.post("/", async (req, res) => {
  try {
    const { name, type, address, contact, location, availableBeds, availableRescueTeams } = req.body;

    if (!location || !location.coordinates) {
      return res.status(400).json({ message: "Location (with coordinates) is required" });
    }

    const resource = new Resource({
      name,
      type,
      address,
      contact,
      location,
      availableBeds,
      availableRescueTeams
    });

    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    console.error("Error creating resource:", err);
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get all resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📍 Get nearby resources (query: ?lng=..&lat=..&radius=..)
router.get("/nearby", async (req, res) => {
  const { lng, lat, radius = 5 } = req.query; // default radius 5 km

  if (!lng || !lat) {
    return res.status(400).json({ message: "Longitude and latitude are required" });
  }

  try {
    const resources = await Resource.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], parseFloat(radius) / 6378.1]
        }
      }
    });

    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
