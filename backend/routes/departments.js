const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const multer = require("multer");
const path = require("path");

/* ------------------- MULTER SETUP ------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, path.join(__dirname, "../../frontend/public/images"));
    } else {
      cb(null, path.join(__dirname, "../../frontend/public/uploads"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ------------------- GET ALL ------------------- */
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find().sort({
      order: 1,
      createdAt: 1,
    });
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

/* ------------------- GET ONE ------------------- */
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ error: "Not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch department" });
  }
});

/* ------------------- CREATE (FIXED) ------------------- */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      headDoctor,
      secondaryDoctor,
      contactNumber,
      email,
      facilities,
      services,
      image1,
      image2,
      order,
      isActive,
      detailedContent,
      doctors, // ✅ IMPORTANT FIX
    } = req.body;

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

      doctors: doctors || [],

      detailedContent: detailedContent || {
        about: "",
        aboutHeading: "About This Department",
        whyChoose: "",
        whyChooseHeading: "Why Choose Our Department",
        image1Path: "",
        image2Path: "",
      },
    });

    const saved = await newDepartment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create department" });
  }
});

/* ------------------- UPDATE (FIXED) ------------------- */
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      description,
      headDoctor,
      secondaryDoctor,
      contactNumber,
      email,
      facilities,
      services,
      image1,
      image2,
      order,
      isActive,
      detailedContent,
      doctors, // ✅ IMPORTANT FIX
    } = req.body;

    const updated = await Department.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        headDoctor,
        secondaryDoctor,
        contactNumber,
        email,
        facilities,
        services,
        image1,
        image2,
        order,
        isActive,
        detailedContent,
        doctors, // ✅ SAVE DOCTORS
      },
      { new: true },
    );

    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update" });
  }
});

/* ------------------- DELETE ------------------- */
router.delete("/:id", async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

/* ------------------- IMAGE UPLOAD ------------------- */
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  res.json({
    message: "Uploaded successfully",
    imagePath: `/images/${req.file.filename}`,
  });
});

module.exports = router;
