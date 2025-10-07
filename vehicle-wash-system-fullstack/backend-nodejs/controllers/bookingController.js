// controllers/bookingController.js - Booking Business Logic
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const { sendConfirmationSMS, sendCompletionSMS } = require('../services/smsService');

// Create New Booking
exports.createBooking = async (req, res) => {
  try {
    const { customerName, mobileNumber, vehicleNumber, vehicleType, bookingDate, timeSlot } = req.body;

    // Validate vehicle type
    if (vehicleType !== '4-wheeler') {
      return res.status(400).json({
        success: false,
        message: 'Only 4-wheeler vehicles are accepted'
      });
    }

    // Check slot availability
    const dateOnly = new Date(bookingDate);
    dateOnly.setHours(0, 0, 0, 0);

    let slot = await Slot.findOne({ 
      date: dateOnly, 
      timeSlot: timeSlot 
    });

    // Create slot if doesn't exist
    if (!slot) {
      slot = new Slot({
        date: dateOnly,
        timeSlot: timeSlot,
        currentOccupancy: 0
      });
    }

    // Check if slot is full (max 3 vehicles)
    if (slot.currentOccupancy >= 3) {
      return res.status(400).json({
        success: false,
        message: 'This slot is fully booked. Please choose another time slot.'
      });
    }

    // Create booking
    const booking = new Booking({
      customerName,
      mobileNumber,
      vehicleNumber,
      vehicleType,
      bookingDate: dateOnly,
      timeSlot,
      status: 'pending'
    });

    await booking.save();

    // Update slot occupancy
    slot.currentOccupancy += 1;
    await slot.save();

    // Send confirmation SMS
    await sendConfirmationSMS(mobileNumber, booking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get All Bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1, timeSlot: 1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Get Booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

// Check Slot Availability
exports.checkAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    // Get all slots for the date
    const slots = await Slot.find({ date: dateOnly });

    // Define all time slots
    const allTimeSlots = [
      '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
      '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'
    ];

    // Create availability map
    const availability = allTimeSlots.map(timeSlot => {
      const slot = slots.find(s => s.timeSlot === timeSlot);
      return {
        timeSlot,
        currentOccupancy: slot ? slot.currentOccupancy : 0,
        maxCapacity: 3,
        isAvailable: slot ? slot.currentOccupancy < 3 : true
      };
    });

    res.status(200).json({
      success: true,
      date: dateOnly,
      slots: availability
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking availability',
      error: error.message
    });
  }
};

// Complete Booking
exports.completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Booking already completed'
      });
    }

    // Update booking status
    booking.status = 'completed';
    booking.completionTime = new Date();
    await booking.save();

    // Update slot occupancy
    const dateOnly = new Date(booking.bookingDate);
    dateOnly.setHours(0, 0, 0, 0);

    const slot = await Slot.findOne({
      date: dateOnly,
      timeSlot: booking.timeSlot
    });

    if (slot && slot.currentOccupancy > 0) {
      slot.currentOccupancy -= 1;
      await slot.save();
    }

    // Send completion SMS
    await sendCompletionSMS(booking.mobileNumber, booking);

    res.status(200).json({
      success: true,
      message: 'Booking completed successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error completing booking',
      error: error.message
    });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update slot occupancy
    const dateOnly = new Date(booking.bookingDate);
    dateOnly.setHours(0, 0, 0, 0);

    const slot = await Slot.findOne({
      date: dateOnly,
      timeSlot: booking.timeSlot
    });

    if (slot && slot.currentOccupancy > 0) {
      slot.currentOccupancy -= 1;
      await slot.save();
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};