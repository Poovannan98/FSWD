// components/SlotAvailability.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const SlotAvailability = ({ date }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (date) {
      fetchAvailability();
    }
  }, [date]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/bookings/availability`, {
        params: { date }
      });
      
      if (response.data.success) {
        setSlots(response.data.slots);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSlotStatus = (slot) => {
    if (slot.currentOccupancy === 0) {
      return { status: 'available', color: '#4caf50', text: 'Available' };
    } else if (slot.currentOccupancy < 3) {
      return { 
        status: 'partial', 
        color: '#ff9800', 
        text: `${3 - slot.currentOccupancy} slots left` 
      };
    } else {
      return { status: 'full', color: '#f44336', text: 'Full' };
    }
  };

  if (loading) {
    return <div className="loading">Loading availability...</div>;
  }

  return (
    <div className="slot-availability">
      <h3>Slot Availability for {new Date(date).toLocaleDateString()}</h3>
      <div className="slots-grid">
        {slots.map((slot, index) => {
          const status = getSlotStatus(slot);
          return (
            <div 
              key={index} 
              className={`slot-card ${status.status}`}
              style={{ borderColor: status.color }}
            >
              <div className="slot-time">{slot.timeSlot}</div>
              <div className="slot-occupancy">
                <span className="occupancy-badge" style={{ backgroundColor: status.color }}>
                  {slot.currentOccupancy}/3
                </span>
              </div>
              <div className="slot-status" style={{ color: status.color }}>
                {status.text}
              </div>
            </div>
          );
        })}
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4caf50' }}></span>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ff9800' }}></span>
          <span>Partially Filled</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f44336' }}></span>
          <span>Full</span>
        </div>
      </div>
    </div>
  );
};

export default SlotAvailability;