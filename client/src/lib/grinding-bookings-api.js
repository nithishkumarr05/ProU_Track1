import { mockGrindingBookings } from "../data/mockData";

export const checkBookingAuth = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: "Mock authentication successful" };
};

export const getAvailableSlots = async (date) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM", 
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM"
  ];
  
  return { success: true, data: mockSlots };
};

export const createBooking = async (bookingData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const bookings = JSON.parse(localStorage.getItem('grindingBookings') || '[]');
  const newBooking = {
    _id: Date.now().toString(),
    ...bookingData,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  bookings.push(newBooking);
  localStorage.setItem('grindingBookings', JSON.stringify(bookings));
  
  return { success: true, data: newBooking };
};

export const getMyBookings = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const bookings = JSON.parse(localStorage.getItem('grindingBookings') || '[]');
  
  return { success: true, data: bookings };
};

export const getAllBookings = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const bookings = JSON.parse(localStorage.getItem('grindingBookings') || '[]');
  return { success: true, data: bookings };
};

export const updateBookingStatus = async (bookingId, status) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const bookings = JSON.parse(localStorage.getItem('grindingBookings') || '[]');
  const booking = bookings.find(b => b._id === bookingId);
  
  if (booking) {
    booking.status = status;
    localStorage.setItem('grindingBookings', JSON.stringify(bookings));
    return { success: true, data: booking };
  }
  
  throw new Error('Booking not found');
};