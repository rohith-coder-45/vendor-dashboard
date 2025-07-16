'use client';

import { useState, useEffect } from 'react';
import useAuth from '../utils/useAuth';
import styles from './manual.module.css';

type Booking = {
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

export default function ManualBookingPage() {
  useAuth();

  const [form, setForm] = useState<Booking>({
    id: '',
    date: '',
    driver: '',
    vehicleType: '',
    vehicleNo: '',
    location: '',
    contact: '',
    company: '',
    status: 'Ongoing',
  });

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('manual_bookings');
    if (stored) setBookings(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.driver || !form.vehicleNo) {
      return alert('Please fill required fields');
    }

    const updated = [...bookings, form];
    setBookings(updated);
    localStorage.setItem('manual_bookings', JSON.stringify(updated));

    setForm({
      id: '',
      date: '',
      driver: '',
      vehicleType: '',
      vehicleNo: '',
      location: '',
      contact: '',
      company: '',
      status: 'Ongoing',
    });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>📝 Manual Booking</h1>

      <div className={styles.form}>
        <input name="id" placeholder="Booking ID" value={form.id} onChange={handleChange} />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Booking Date"
          title="Booking Date"
        />
        <input name="driver" placeholder="Driver Name" value={form.driver} onChange={handleChange} />
        <input name="vehicleType" placeholder="Vehicle Type" value={form.vehicleType} onChange={handleChange} />
        <input name="vehicleNo" placeholder="Vehicle Number" value={form.vehicleNo} onChange={handleChange} />
        <input name="location" placeholder="Pickup Location" value={form.location} onChange={handleChange} />
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
        <label htmlFor="status">Booking Status</label>
        <select id="status" name="status" value={form.status} onChange={handleChange}>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={handleSubmit}>➕ Add Booking</button>
      </div>

      <div className={styles.list}>
        <h2>📋 Submitted Bookings</h2>
        {bookings.map((b) => (
          <div key={b.id} className={styles.card}>
            <h3>{b.id} - {b.status}</h3>
            <p>Date: {b.date}</p>
            <p>Driver: {b.driver}</p>
            <p>Vehicle: {b.vehicleType} - {b.vehicleNo}</p>
            <p>Location: {b.location}</p>
            <p>Contact: {b.contact}</p>
            <p>Company: {b.company}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
