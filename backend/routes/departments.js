const express = require("express");
const router = express.Router();
const Department = require("../models/Department");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const heicConvert = require("heic-convert");

const imagesDir = path.join(__dirname, "../public/images");

const isHeicFile = (file) => {
  const ext = path.extname(file.originalname || file.filename).toLowerCase();
  return (
    ext === ".heic" ||
    ext === ".heif" ||
    file.mimetype === "image/heic" ||
    file.mimetype === "image/heif"
  );
};

const getPublicImagePath = async (file) => {
  if (!isHeicFile(file)) return `/images/${file.filename}`;

  const sourcePath = file.path;
  const jpgFilename = `${path.parse(file.filename).name}.jpg`;
  const jpgPath = path.join(imagesDir, jpgFilename);
  const inputBuffer = await fs.readFile(sourcePath);
  const outputBuffer = await heicConvert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.92,
  });

  await fs.writeFile(jpgPath, outputBuffer);
  await fs.unlink(sourcePath).catch(() => {});
  return `/images/${jpgFilename}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// --- DATA PROCESSOR ---
const processDepartmentData = async (req) => {
  const updateData = { ...req.body };

  const safeParse = (val) => {
    if (!val || val === "undefined" || val === "null" || val === "") return [];
    try {
      return JSON.parse(val);
    } catch (e) {
      return [];
    }
  };

  updateData.doctors = safeParse(updateData.doctors);

  // Main Image
  const mainImage = req.files?.find((f) => f.fieldname === "image");
  if (mainImage) updateData.image = await getPublicImagePath(mainImage);

  const iconImage = req.files?.find((f) => f.fieldname === "imageIcon");
  if (iconImage) updateData.imageIcon = await getPublicImagePath(iconImage);

  // Doctor Images
  if (Array.isArray(updateData.doctors)) {
    updateData.doctors = updateData.doctors.map((doc, index) => {
      const docFile = req.files?.find(
        (f) => f.fieldname === `doctor_image_${index}`,
      );
      if (docFile) doc.image = docFile;
      return doc;
    });
    updateData.doctors = await Promise.all(
      updateData.doctors.map(async (doc) => {
        if (doc.image && typeof doc.image === "object") {
          doc.image = await getPublicImagePath(doc.image);
        }
        return doc;
      }),
    );
  }

  return updateData;
};

/* ROUTES */

router.get("/", async (req, res) => {
  const depts = await Department.find().sort({ createdAt: -1 });
  res.json(depts);
});

router.get("/:id", async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    res.json(dept);
  } catch (err) {
    res.status(404).json({ error: "Not found" });
  }
});

router.post("/", upload.any(), async (req, res) => {
  try {
    const data = await processDepartmentData(req);
    const newDept = new Department(data);
    await newDept.save();
    res.status(201).json(newDept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.any(), async (req, res) => {
  try {
    const data = await processDepartmentData(req);
    const updated = await Department.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);

    if(!dept) {
      return res.status(404).json({
        error: "Department Not Found",
      });
    }

    if(dept.image) {
      const imagePath = path.join(
        __dirname,
        "../public",
        dept.image.replace("/images/", "images/"),
      );

      await fs.unlink(imagePath).catch(() => {});
    }

    if (dept.imageIcon) {
      const iconPath = path.join(
        __dirname,
        "../public",
        dept.imageIcon.replace("/images/", "images/"),
      );

      await fs.unlink(iconPath).catch(() => {});
    }

    if (Array.isArray(dept.doctors)) {
      for (const doc of dept.doctors) {
        if (doc.image) {
          const doctorImagePath = path.join(
            __dirname,
            "../public",
            doc.image.replace("/images/", "images/"),
          );

          await fs.unlink(doctorImagePath).catch(() => {});
        }
      }
    }
 await Department.findByIdAndDelete(req.params.id);

    res.json({
      message: "Department and associated images deleted successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
