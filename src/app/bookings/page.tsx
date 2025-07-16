'use client';

import useAuth from '../utils/useAuth'; // ✅ Route protection
import styles from './bookings.module.css';

export default function BookingsPage() {
  useAuth(); // 🔐 Enforce login

  const dummyBookings = [
    {
      id: 'BK001',
      date: '2025-07-15',
      status: 'Ongoing',
      driver: 'John Doe',
      vehicleType: 'Sedan',
      vehicleNo: 'MH12AB1234',
      location: 'Pune',
      contact: '+91-9876543210',
      company: 'TechCorp Pvt Ltd',
    },
    {
      id: 'BK002',
      date: '2025-07-12',
      status: 'Completed',
      driver: 'Anita Desai',
      vehicleType: 'SUV',
      vehicleNo: 'DL01XY9876',
      location: 'Delhi',
      contact: '+91-9012345678',
      company: 'SoftEdge Ltd',
    },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>📋 All Bookings</h1>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>ID</span>
          <span>Date</span>
          <span>Status</span>
          <span>Driver</span>
          <span>Vehicle</span>
          <span>Location</span>
          <span>Contact</span>
          <span>Company</span>
        </div>
        {dummyBookings.map((booking) => (
          <div key={booking.id} className={styles.tableRow}>
            <span>{booking.id}</span>
            <span>{booking.date}</span>
            <span className={styles.status}>{booking.status}</span>
            <span>{booking.driver}</span>
            <span>{`${booking.vehicleType} - ${booking.vehicleNo}`}</span>
            <span>{booking.location}</span>
            <span>{booking.contact}</span>
            <span>{booking.company}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
