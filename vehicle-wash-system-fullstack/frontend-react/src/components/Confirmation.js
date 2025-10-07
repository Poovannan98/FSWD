// components/Confirmation.jsx
import React from 'react';

const Confirmation = ({ booking, onBack }) => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✓</div>
        <h2>Booking Confirmed!</h2>
        <p className="success-message">
          A confirmation SMS has been sent to your mobile number
        </p>

        <div className="booking-details">
          <h3>Booking Details</h3>
          
          <div className="detail-row">
            <span className="detail-label">Booking ID:</span>
            <span className="detail-value">{booking.bookingId}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Customer Name:</span>
            <span className="detail-value">{booking.customerName}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Mobile Number:</span>
            <span className="detail-value">{booking.mobileNumber}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Vehicle Number:</span>
            <span className="detail-value">{booking.vehicleNumber}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Vehicle Type:</span>
            <span className="detail-value">{booking.vehicleType}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Date:</span>
            <span className="detail-value">
              {new Date(booking.bookingDate).toLocaleDateString()}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Time Slot:</span>
            <span className="detail-value">{booking.timeSlot}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="detail-value status-pending">{booking.status}</span>
          </div>
        </div>

        <div className="important-note">
          <h4>Important Notes:</h4>
          <ul>
            <li>Please arrive 5 minutes before your scheduled time</li>
            <li>Estimated washing time: 30-45 minutes</li>
            <li>You will receive a completion SMS after service</li>
            <li>Keep your Booking ID for reference</li>
          </ul>
        </div>

        <button className="back-btn" onClick={onBack}>
          Book Another Slot
        </button>
      </div>
    </div>
  );
};

export default Confirmation;