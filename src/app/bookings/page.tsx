'use client';

import { useEffect, useState } from 'react';
import useAuth from '../utils/useAuth';
import styles from './bookings.module.css';

type Booking = {
  _id?: string;
  id: string;
  date: string;
  driver: string;
  vehicleType: string;
  vehicleNo: string;
  location: string;
  contact: string;
  company: string;
  status: string;
};

export default function BookingsPage() {
  useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading bookings:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>📋 All Bookings</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
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
          {bookings.map((b) => (
            <div key={b._id} className={styles.tableRow}>
              <span>{b.id}</span>
              <span>{b.date}</span>
              <span className={styles.status}>{b.status}</span>
              <span>{b.driver}</span>
              <span>{`${b.vehicleType} - ${b.vehicleNo}`}</span>
              <span>{b.location}</span>
              <span>{b.contact}</span>
              <span>{b.company}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
