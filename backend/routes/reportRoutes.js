import express from 'express';
import Report from '../models/Report.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // folder to store uploaded photos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// POST /api/reports - Submit a new report
router.post('/', upload.array('photos', 5), async (req, res) => {
  try {
    console.log("✅ Incoming body:", req.body);
    console.log("✅ Incoming files:", req.files);

    const { incidentType, severity, description, location, emergencyContact, anonymous } = req.body;

    if (!incidentType || !severity || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const [lat, lng] = location.split(',').map(Number);
    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ message: 'Invalid location format' });
    }

    const photos = req.files ? req.files.map(file => file.filename) : [];

    const newReport = new Report({
      type: incidentType,
      severity,
      description,
      reporterName: anonymous === 'true' ? 'Anonymous' : 'N/A',
      reporterContact: anonymous === 'true' ? '' : emergencyContact,
      location: { type: 'Point', coordinates: [lng, lat] },
      photos
    });

    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (err) {
    console.error("❌ Failed to save report:", err);
    res.status(500).json({ message: 'Server error while saving report' });
  }
});

// GET /api/reports - Fetch all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }); // newest first
    res.json(reports);
  } catch (err) {
    console.error('❌ Error fetching reports:', err);
    res.status(500).json({ message: 'Server error while fetching reports' });
  }
});



export default router;
