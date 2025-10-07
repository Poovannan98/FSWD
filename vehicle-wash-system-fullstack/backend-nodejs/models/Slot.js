// models/Slot.js - Slot Schema
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  currentOccupancy: {
    type: Number,
    default: 0,
    min: 0,
    max: 3
  },
  maxCapacity: {
    type: Number,
    default: 3
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index to ensure unique date-timeSlot combination
slotSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

// Update availability based on occupancy
slotSchema.pre('save', function(next) {
  this.isAvailable = this.currentOccupancy < this.maxCapacity;
  next();
});

module.exports = mongoose.model('Slot', slotSchema);