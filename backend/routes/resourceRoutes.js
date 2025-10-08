import express from "express";
import Resource from "../models/Resource.js";

const router = express.Router();

// ➕ Add a new resource
router.post("/", async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
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

// 📍 Get nearby resources by coordinates (lng, lat, radius in km)
router.get("/nearby", async (req, res) => {
  const { lng, lat, radius } = req.query;
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
