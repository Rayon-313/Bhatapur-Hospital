const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const multer = require('multer');
const heicConvert = require('heic-convert');
const HomeContent = require('../models/HomeContent');

let ffmpeg = null;
try {
  ffmpeg = require('fluent-ffmpeg');
} catch (err) {
  console.warn('fluent-ffmpeg is not installed; MOV uploads will be saved without conversion.');
}

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');
const videosDir = path.join(publicDir, 'videos');

fsSync.mkdirSync(imagesDir, { recursive: true });
fsSync.mkdirSync(videosDir, { recursive: true });

const convertHeicToJpg = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.heic' && ext !== '.heif') return `/images/${file.filename}`;

  const jpgFilename = `${path.parse(file.filename).name}.jpg`;
  const jpgPath = path.join(imagesDir, jpgFilename);
  
  const inputBuffer = await fs.readFile(file.path);
  const outputBuffer = await heicConvert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.92,
  });

  await fs.writeFile(jpgPath, outputBuffer);
  await fs.unlink(file.path).catch(() => {});
  return `/images/${jpgFilename}`;
};

const convertMovToMp4 = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.mov') return `/videos/${file.filename}`;

  if (!ffmpeg) {
    return `/videos/${file.filename}`;
  }

  const mp4Filename = `${path.parse(file.filename).name}.mp4`;
  const mp4Path = path.join(videosDir, mp4Filename);

  return new Promise((resolve, reject) => {
    ffmpeg(file.path)
      .toFormat('mp4')
      .on('end', async () => {
        await fs.unlink(file.path).catch(() => {});
        resolve(`/videos/${mp4Filename}`);
      })
      .on('error', (err) => reject(err))
      .save(mp4Path);
  });
};

const deleteFile = async (relativeUrl) => {
  if (!relativeUrl || typeof relativeUrl !== 'string') return;
  const localPath = path.resolve(publicDir, relativeUrl.replace(/^\//, ''));
  if (!localPath.startsWith(path.resolve(publicDir) + path.sep)) return;

  try {
    if (fsSync.existsSync(localPath)) {
      await fs.unlink(localPath);
    }
  } catch (err) {
    console.error('Cleanup failed:', localPath, err.message);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = file.fieldname === 'video' ? videosDir : imagesDir;
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
  }
});

const upload = multer({ storage });

const parseJsonField = (value, fallback) => {
  if (value === undefined) return fallback;
  if (value === null || value === '' || value === 'undefined' || value === 'null') return fallback;
  if (typeof value !== 'string') return value;

  try {
    return JSON.parse(value);
  } catch (err) {
    return fallback;
  }
};

const cleanupReplacedFiles = async (oldContent, newContent) => {
  if (!oldContent) return;

  if (newContent.videoPath && newContent.videoPath !== oldContent.videoPath) {
    await deleteFile(oldContent.videoPath);
  }

  if (Array.isArray(oldContent.bannerImages)) {
    const nextBanners = Array.isArray(newContent.bannerImages) ? newContent.bannerImages : [];
    for (const oldImg of oldContent.bannerImages) {
      if (!nextBanners.includes(oldImg)) await deleteFile(oldImg);
    }
  }

  if (Array.isArray(oldContent.services)) {
    const nextServices = Array.isArray(newContent.services) ? newContent.services : [];
    for (let i = 0; i < oldContent.services.length; i++) {
      const oldService = oldContent.services[i] || {};
      const newService = nextServices[i] || {};

      if (oldService.imageUrl && oldService.imageUrl !== newService.imageUrl) {
        await deleteFile(oldService.imageUrl);
      }

      const oldDetail = oldService.detailedContent || {};
      const newDetail = newService.detailedContent || {};

      if (oldDetail.image1Path && oldDetail.image1Path !== newDetail.image1Path) {
        await deleteFile(oldDetail.image1Path);
      }

      if (oldDetail.image2Path && oldDetail.image2Path !== newDetail.image2Path) {
        await deleteFile(oldDetail.image2Path);
      }
    }
  }
};

router.get('/', async (req, res) => {
  try {
    const content = await HomeContent.findOne().sort({ createdAt: -1 });
    res.json(content || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', upload.any(), async (req, res) => {
  try {
    const oldContent = await HomeContent.findOne().sort({ createdAt: -1 });
    let updateData = { ...req.body };

    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    updateData.services = parseJsonField(updateData.services, updateData.services);
    updateData.bannerImages = parseJsonField(updateData.bannerImages, updateData.bannerImages);
    updateData.whyChooseUs = parseJsonField(updateData.whyChooseUs, updateData.whyChooseUs);
    updateData.rotatingTextPhrases = parseJsonField(updateData.rotatingTextPhrases, updateData.rotatingTextPhrases);

    const videoFile = req.files?.find(f => f.fieldname === 'video');
    if (videoFile) {
      updateData.videoPath = await convertMovToMp4(videoFile);
      if (oldContent?.videoPath) await deleteFile(oldContent.videoPath);
    }

    const img1File = req.files?.find(f => f.fieldname === 'image1');
    if (img1File) {
      updateData.image1Path = await convertHeicToJpg(img1File);
      if (oldContent?.image1Path) await deleteFile(oldContent.image1Path);
    }

    const img2File = req.files?.find(f => f.fieldname === 'image2');
    if (img2File) {
      updateData.image2Path = await convertHeicToJpg(img2File);
      if (oldContent?.image2Path) await deleteFile(oldContent.image2Path);
    }

    if (Array.isArray(updateData.services)) {
      for (let i = 0; i < updateData.services.length; i++) {
        const serviceFile = req.files?.find(f => f.fieldname === `service_image_${i}`);
        if (serviceFile) {
          const newPath = await convertHeicToJpg(serviceFile);
          if (oldContent?.services?.[i]?.imageUrl) await deleteFile(oldContent.services[i].imageUrl);
          updateData.services[i].imageUrl = newPath;
        }
      }
    }

    await cleanupReplacedFiles(oldContent, updateData);

    const updated = await HomeContent.findOneAndUpdate(
      {}, 
      { $set: updateData }, 
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const imagePath = await convertHeicToJpg(req.file);
    res.json({ message: 'Image uploaded successfully', imagePath });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/upload-video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No video uploaded' });

    const videoPath = await convertMovToMp4(req.file);
    res.json({ message: 'Video uploaded successfully', videoPath });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/clear-all', async (req, res) => {
  try {
    const all = await HomeContent.find();
    for (const content of all) {
      await deleteFile(content.videoPath);
      if (content.bannerImages) {
        for (const img of content.bannerImages) await deleteFile(img);
      }
      if (content.services) {
        for (const service of content.services) {
          await deleteFile(service.imageUrl);
          await deleteFile(service.detailedContent?.image1Path);
          await deleteFile(service.detailedContent?.image2Path);
        }
      }
    }
    await HomeContent.deleteMany({});
    res.json({ message: 'Database and files cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
