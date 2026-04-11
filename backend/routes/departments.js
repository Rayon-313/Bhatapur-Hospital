const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
// Import Department model to fetch dynamic list if needed
const Department = require('../models/Department');

/* ------------------- DEPARTMENT LIST ------------------- */
// You can define a hardcoded list for quick validation
const VALID_DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Surgery",
  "Dermatology"
];

// 1. New Route: Get the list of available departments for the frontend dropdown
router.get('/list-departments', async (req, res) => {
  try {
    // Attempt to get dynamic names from your Department collection
    const departments = await Department.find({ isActive: true }).select('name');
    
    if (departments.length > 0) {
      return res.json(departments.map(d => d.name));
    }
    
    // Fallback to hardcoded list if database is empty
    res.json(VALID_DEPARTMENTS);
  } catch (error) {
    res.json(VALID_DEPARTMENTS); // Fallback on error
  }
});

// 2. Create a new appointment (with validation)
router.post('/', async (req, res) => {
  try {
    const { fullName, phone, email, department, preferredDate, problemDescription } = req.body;
    
    // Optional: Basic validation to ensure department was selected
    if (!department) {
      return res.status(400).json({ error: 'Please select a department' });
    }

    const newAppointment = new Appointment({
      fullName,
      phone,
      email,
      department,
      preferredDate,
      problemDescription
    });
    
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

/* ------------------- REST OF YOUR ROUTES ------------------- */

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// ... (Get by ID, Update, and Delete remain exactly the same)

module.exports = router;