const Report = require('../models/Report');

// helper to normalize location input
function normalizeLocation(location) {
  // accept { lat, lng } or [lng, lat] or { coordinates: [lng, lat] }
  if (!location) return null;
  if (Array.isArray(location)) return { type: 'Point', coordinates: location };
  if (location.lng !== undefined && location.lat !== undefined) return { type: 'Point', coordinates: [Number(location.lng), Number(location.lat)] };
  if (location.coordinates && Array.isArray(location.coordinates)) return { type: 'Point', coordinates: location.coordinates };
  return null;
}

exports.createReport = async (req, res, next) => {
  try {
    const { type, severity, description, reporterName, reporterContact } = req.body;
    const location = normalizeLocation(req.body.location);
    if (!location) return res.status(400).json({ message: 'Location required (lat/lng or [lng,lat])' });

    const report = await Report.create({
      type, severity, description, reporterName, reporterContact, location
    });

    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
};

exports.getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).limit(200);
    res.json(reports);
  } catch (err) { next(err); }
};

exports.getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (err) { next(err); }
};

// GET /api/reports/nearby?lat=..&lng=..&radius=5000
exports.getNearbyReports = async (req, res, next) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'lat and lng required' });

    const reports = await Report.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
          $maxDistance: Number(radius)
        }
      }
    }).limit(200);

    res.json(reports);
  } catch (err) { next(err); }
};
