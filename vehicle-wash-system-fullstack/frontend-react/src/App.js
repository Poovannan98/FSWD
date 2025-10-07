// App.jsx - Main React Application
import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import SlotAvailability from './components/SlotAvailability';
import AdminDashboard from './components/AdminDashboard';
import Confirmation from './components/Confirmation';
import './App.css';

function App() {
  const [view, setView] = useState('booking'); // booking, admin, confirmation
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleBookingSuccess = (booking) => {
    setConfirmedBooking(booking);
    setView('confirmation');
  };

  const handleBackToBooking = () => {
    setView('booking');
    setConfirmedBooking(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚗 Vehicle Water Washing Service</h1>
        <nav className="nav-buttons">
          <button 
            onClick={() => setView('booking')}
            className={view === 'booking' ? 'active' : ''}
          >
            Book Now
          </button>
          <button 
            onClick={() => setView('admin')}
            className={view === 'admin' ? 'active' : ''}
          >
            Admin Dashboard
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === 'booking' && (
          <div className="booking-view">
            <BookingForm onBookingSuccess={handleBookingSuccess} />
          </div>
        )}

        {view === 'admin' && (
          <AdminDashboard />
        )}

        {view === 'confirmation' && confirmedBooking && (
          <Confirmation 
            booking={confirmedBooking} 
            onBack={handleBackToBooking}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Vehicle Washing Service | Max 3 vehicles at a time | 4-wheelers only</p>
      </footer>
    </div>
  );
}

export default App;