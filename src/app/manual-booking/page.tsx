"use client";

import { useState, useEffect } from 'react';
import useAuth from '../utils/useAuth';
import styles from './manual.module.css';

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

export default function ManualBookingPage() {
  useAuth();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
  const [loading, setLoading] = useState(true);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.id || !form.driver || !form.vehicleNo) {
      alert('Please fill required fields');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
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
        refreshBookings();
      } else {
        alert('Failed to submit booking.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Server error.');
    }
  };

  const refreshBookings = async () => {
    const updated = await fetch(`${apiUrl}/api/bookings`).then((r) => r.json());
    setBookings(updated);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        refreshBookings();
      } else {
        alert('Failed to update status.');
      }
    } catch (err) {
      console.error('Status update error:', err);
      alert('Server error.');
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        refreshBookings();
      } else {
        alert('Failed to delete booking.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error.');
    }
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
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          title="Booking Status"
        >
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={handleSubmit}>➕ Add Booking</button>
      </div>

      <div className={styles.list}>
        <h2>📋 Submitted Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id || b.id} className={styles.card}>
              <h3>{b.id} - {b.status}</h3>
              <p>Date: {b.date}</p>
              <p>Driver: {b.driver}</p>
              <p>Vehicle: {b.vehicleType} - {b.vehicleNo}</p>
              <p>Location: {b.location}</p>
              <p>Contact: {b.contact}</p>
              <p>Company: {b.company}</p>
              <button onClick={() => updateStatus(b._id || '', 'Ongoing')}>▶️ Start Trip</button>
              <button onClick={() => updateStatus(b._id || '', 'Completed')}>✅ End Trip</button>
              <button onClick={() => deleteBooking(b._id || '')}>🗑️ Delete</button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
