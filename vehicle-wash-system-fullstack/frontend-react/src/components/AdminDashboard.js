// components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/bookings`);
      if (response.data.success) {
        setBookings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    if (!window.confirm('Mark this booking as completed?')) {
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/bookings/${bookingId}/complete`);
      if (response.data.success) {
        alert('Booking completed! Completion SMS sent to customer.');
        fetchBookings(); // Refresh list
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to complete booking';
      alert(message);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
      if (response.data.success) {
        alert('Booking cancelled successfully');
        fetchBookings(); // Refresh list
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to cancel booking';
      alert(message);
    }
  };

  const getFilteredBookings = () => {
    if (filter === 'all') return bookings;
    return bookings.filter(booking => booking.status === filter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'in-progress': return '#2196f3';
      case 'completed': return '#4caf50';
      case 'cancelled': return '#f44336';
      default: return '#757575';
    }
  };

  const filteredBookings = getFilteredBookings();

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="refresh-btn" onClick={fetchBookings}>
          🔄 Refresh
        </button>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>{bookings.length}</h3>
          <p>Total Bookings</p>
        </div>
        <div className="stat-card">
          <h3>{bookings.filter(b => b.status === 'pending').length}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card">
          <h3>{bookings.filter(b => b.status === 'completed').length}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h3>{bookings.filter(b => b.status === 'cancelled').length}</h3>
          <p>Cancelled</p>
        </div>
      </div>

      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="bookings-table">
        {filteredBookings.length === 0 ? (
          <p className="no-bookings">No bookings found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Vehicle No.</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.mobileNumber}</td>
                  <td>{booking.vehicleNumber}</td>
                  <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                  <td>{booking.timeSlot}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(booking.status) }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'pending' && (
                      <>
                        <button
                          className="complete-btn"
                          onClick={() => handleCompleteBooking(booking._id)}
                        >
                          Complete
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === 'completed' && (
                      <span className="completed-text">Service Done</span>
                    )}
                    {booking.status === 'cancelled' && (
                      <span className="cancelled-text">Cancelled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;