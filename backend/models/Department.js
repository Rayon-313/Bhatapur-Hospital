const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  headDoctor: {
    type: String,
    default: ''
  },
    secondaryDoctor: {
    type: String,
    default: ''
  },
  contactNumber: {
    type: String,
    default: '',

  },
  email: {
    type: String,
    default: ''
  },
  facilities: [{
    type: String
  }],
  services: [{
    type: String
  }],
  image1: {
    type: String,
    default: ''
  },
  image2: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  detailedContent: {
    about: {
      type: String,
      default: ''
    },
    aboutHeading: {
      type: String,
      default: 'About This Department'
    },
    whyChoose: {
      type: String,
      default: ''
    },
    whyChooseHeading: {
      type: String,
      default: 'Why Choose Our Department'
    },
    image1Path: {
      type: String,
      default: ''
    },
    image2Path: {
      type: String,
      default: ''
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

departmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now;
  next();
});

module.exports = mongoose.model('Department', departmentSchema);