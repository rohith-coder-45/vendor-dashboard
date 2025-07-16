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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading bookings:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>📋 All Bookings</h1>

      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Search by Booking ID, Driver, Company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        <select
          aria-label="Filter bookings by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Statuses</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

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
          {bookings
            .filter((b) => {
              const matchesSearch =
                b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.company.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesStatus = statusFilter ? b.status === statusFilter : true;
              return matchesSearch && matchesStatus;
            })
            .map((b) => (
              <div key={b._id || b.id} className={styles.tableRow}>
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
