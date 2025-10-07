// services/smsService.js - SMS Service using Twilio
const twilio = require('twilio');

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

let client;
if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

// Send Confirmation SMS
const sendConfirmationSMS = async (mobileNumber, bookingDetails) => {
  try {
    const message = `Booking Confirmed! 
ID: ${bookingDetails.bookingId}
Date: ${new Date(bookingDetails.bookingDate).toLocaleDateString()}
Time: ${bookingDetails.timeSlot}
Vehicle: ${bookingDetails.vehicleNumber}
Thank you for choosing our service!`;

    if (client) {
      const result = await client.messages.create({
        body: message,
        from: twilioNumber,
        to: `+91${mobileNumber}` // Adjust country code as needed
      });
      console.log('Confirmation SMS sent:', result.sid);
      return { success: true, messageSid: result.sid };
    } else {
      // For development without Twilio credentials
      console.log('SMS Service not configured. Message would be:', message);
      return { success: true, message: 'SMS service not configured (dev mode)' };
    }
  } catch (error) {
    console.error('Error sending confirmation SMS:', error);
    return { success: false, error: error.message };
  }
};

// Send Completion SMS
const sendCompletionSMS = async (mobileNumber, bookingDetails) => {
  try {
    const message = `Service Complete! 
Your vehicle washing is complete.
Booking ID: ${bookingDetails.bookingId}
Vehicle: ${bookingDetails.vehicleNumber}
Thank you for your business. Visit again!`;

    if (client) {
      const result = await client.messages.create({
        body: message,
        from: twilioNumber,
        to: `+91${mobileNumber}`
      });
      console.log('Completion SMS sent:', result.sid);
      return { success: true, messageSid: result.sid };
    } else {
      console.log('SMS Service not configured. Message would be:', message);
      return { success: true, message: 'SMS service not configured (dev mode)' };
    }
  } catch (error) {
    console.error('Error sending completion SMS:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendConfirmationSMS,
  sendCompletionSMS
};