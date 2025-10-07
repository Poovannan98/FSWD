// models/Booking.js - Booking Schema
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Vehicle number is required'],
    uppercase: true,
    trim: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['4-wheeler'],
    default: '4-wheeler'
  },
  bookingDate: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required'],
    enum: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', 
           '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  bookingId: {
    type: String,
    unique: true
  },
  completionTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate unique booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'BK' + Date.now() + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);