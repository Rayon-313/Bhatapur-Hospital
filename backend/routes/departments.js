const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const multer = require('multer');
const path = require('path');

/* ------------------- MULTER SETUP ------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, path.join(__dirname, '../../frontend/public/images'));
    } else {
      cb(null, path.join(__dirname, '../../frontend/public/uploads'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find().sort({ order: 1, createdAt: 1 });
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// Get a specific department by ID
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ error: 'Failed to fetch department' });
  }
});

// Create a new department
router.post('/', async (req, res) => {
  try {
    const { name, description, headDoctor ,secondaryDoctor , contactNumber, email, facilities, services, image1, image2, order, isActive, detailedContent } = req.body;
    
    const newDepartment = new Department({
      name,
      description,
      headDoctor,
      secondaryDoctor,
      contactNumber,
      email,
      facilities: facilities || [],
      services: services || [],
      image1,
      image2,
      order,
      isActive,
      detailedContent: detailedContent || {
        about: '',
        aboutHeading: 'About This Department',
        whyChoose: '',
        whyChooseHeading: 'Why Choose Our Department',
        image1Path: '',
        image2Path: ''
      }
    });
    
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ error: 'Failed to create department' });
  }
});

// Update a department
router.put('/:id', async (req, res) => {
  try {
    const { name, description, headDoctor,secondaryDoctor , contactNumber, email, facilities, services, image1, image2, order, isActive, detailedContent } = req.body;
    
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { name, description, headDoctor,secondaryDoctor , contactNumber, email, facilities, services, image1, image2, order, isActive, detailedContent },
      { new: true, runValidators: true }
    );
    
    if (!updatedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json(updatedDepartment);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'Failed to update department' });
  }
});

// Delete a department
router.delete('/:id', async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    
    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

/* ------------------- FILE UPLOADS ------------------- */
router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
  res.json({ message: 'Image uploaded successfully', imagePath: `/images/${req.file.filename}` });
});

module.exports = router;