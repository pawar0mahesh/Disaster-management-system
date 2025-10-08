// backend/controllers/resourceController.js
const Resource = require('../models/Resource');

function normalizeLocation(location) {
  if (!location) return null;
  if (Array.isArray(location)) return { type: 'Point', coordinates: location };
  if (location.lng !== undefined && location.lat !== undefined) return { type: 'Point', coordinates: [Number(location.lng), Number(location.lat)] };
  if (location.coordinates && Array.isArray(location.coordinates)) return { type: 'Point', coordinates: location.coordinates };
  return null;
}

exports.createResource = async (req, res, next) => {
  try {
    const { name, type, address, contact } = req.body;
    const location = normalizeLocation(req.body.location);
    if (!location) return res.status(400).json({ message: 'Location required' });

    const resource = await Resource.create({ name, type, address, contact, location });
    res.status(201).json(resource);
  } catch (err) { next(err); }
};

exports.getResources = async (req, res, next) => {
  try {
    const resources = await Resource.find().limit(500);
    res.json(resources);
  } catch (err) { next(err); }
};

// GET /api/resources/nearby?lat=..&lng=..&radius=5000
exports.getNearbyResources = async (req, res, next) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'lat and lng required' });

    const resources = await Resource.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
          $maxDistance: Number(radius)
        }
      }
    }).limit(200);

    res.json(resources);
  } catch (err) { next(err); }
};
