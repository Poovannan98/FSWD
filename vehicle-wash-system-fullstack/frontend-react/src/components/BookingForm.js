// components/BookingForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import SlotAvailability from './SlotAvailability';

const API_URL = 'http://localhost:5000/api';

const BookingForm = ({ onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    vehicleNumber: '',
    vehicleType: '4-wheeler',
    bookingDate: '',
    timeSlot: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Update selected date for slot availability
    if (name === 'bookingDate') {
      setSelectedDate(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.mobileNumber.match(/^[0-9]{10}$/)) {
      newErrors.mobileNumber = 'Enter valid 10-digit mobile number';
    }

    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Vehicle number is required';
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Time slot is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/bookings`, formData);
      
      if (response.data.success) {
        alert('Booking confirmed! SMS sent to your mobile number.');
        onBookingSuccess(response.data.data);
        
        // Reset form
        setFormData({
          customerName: '',
          mobileNumber: '',
          vehicleNumber: '',
          vehicleType: '4-wheeler',
          bookingDate: '',
          timeSlot: ''
        });
        setSelectedDate('');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Booking failed. Please try again.';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <div className="form-section">
        <h2>Book Your Vehicle Wash</h2>
        <p className="info-text">Only 4-wheeler vehicles | Max 3 slots available per time</p>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Customer Name *</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.customerName ? 'error' : ''}
            />
            {errors.customerName && <span className="error-text">{errors.customerName}</span>}
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength="10"
              className={errors.mobileNumber ? 'error' : ''}
            />
            {errors.mobileNumber && <span className="error-text">{errors.mobileNumber}</span>}
          </div>

          <div className="form-group">
            <label>Vehicle Number *</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g., TN01AB1234"
              className={errors.vehicleNumber ? 'error' : ''}
            />
            {errors.vehicleNumber && <span className="error-text">{errors.vehicleNumber}</span>}
          </div>

          <div className="form-group">
            <label>Vehicle Type *</label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              disabled
            >
              <option value="4-wheeler">4-Wheeler</option>
            </select>
          </div>

          <div className="form-group">
            <label>Booking Date *</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={errors.bookingDate ? 'error' : ''}
            />
            {errors.bookingDate && <span className="error-text">{errors.bookingDate}</span>}
          </div>

          <div className="form-group">
            <label>Time Slot *</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className={errors.timeSlot ? 'error' : ''}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {errors.timeSlot && <span className="error-text">{errors.timeSlot}</span>}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>

      {selectedDate && (
        <div className="availability-section">
          <SlotAvailability date={selectedDate} />
        </div>
      )}
    </div>
  );
};

export default BookingForm;