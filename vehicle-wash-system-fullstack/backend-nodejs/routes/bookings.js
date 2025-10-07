// routes/bookings.js - API Routes
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create new booking
router.post('/', bookingController.createBooking);

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Check slot availability
router.get('/availability', bookingController.checkAvailability);

// Get specific booking
router.get('/:id', bookingController.getBookingById);

// Complete booking
router.put('/:id/complete', bookingController.completeBooking);

// Cancel booking
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;