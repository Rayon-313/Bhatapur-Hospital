const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const homeContentRoutes = require("./routes/homeContent");
const adminRoutes = require("./routes/admin");
const aboutContentRoutes = require("./routes/aboutContent");
const healthPackagesRoutes = require("./routes/healthPackages");
const bookingsRoutes = require("./routes/bookings");
const appointmentsRoutes = require("./routes/appointments");
const questionsRoutes = require("./routes/questions");
const faqsRoutes = require("./routes/faqs");
const storiesRoutes = require("./routes/stories");
const departmentsRoutes = require("./routes/departments");
const feedbacksRotes = require("./routes/feedbacks");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ STATIC FILES (FIXED)
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(
  "/videos",
  express.static(path.join(__dirname, "../frontend/public/videos")),
);

// DB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/hospital")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// routes
app.use("/api/home-content", homeContentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/about-content", aboutContentRoutes);
app.use("/api/health-packages", healthPackagesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/feedbacks", feedbacksRotes);

// test route
app.get("/", (req, res) => {
  res.send("Hospital Backend API Running...");
});

// start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
