'use client';

import { useState } from 'react';
import styles from './manual.module.css';

type Booking = {
  guestName: string;
  contact: string;
  company: string;
  vehicleType: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
};

export default function ManualBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [form, setForm] = useState<Booking>({
    guestName: '',
    contact: '',
    company: '',
    vehicleType: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.guestName || !form.contact || !form.pickup || !form.drop) {
      alert('Please fill all required fields');
      return;
    }

    setBookings([...bookings, form]);
    setForm({
      guestName: '',
      contact: '',
      company: '',
      vehicleType: '',
      pickup: '',
      drop: '',
      date: '',
      time: '',
    });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>✍️ Manual Booking</h1>

      <div className={styles.form}>
        <input name="guestName" value={form.guestName} onChange={handleChange} placeholder="Guest Name" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Guest Contact" />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" />
        <input name="vehicleType" value={form.vehicleType} onChange={handleChange} placeholder="Vehicle Type" />
        <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="Pick-up Location" />
        <input name="drop" value={form.drop} onChange={handleChange} placeholder="Drop Location" />
        <input name="date" value={form.date} onChange={handleChange} type="date" placeholder="Date" />
        <input name="time" value={form.time} onChange={handleChange} type="time" placeholder="Time" />
        <button onClick={handleSubmit}>Confirm Booking</button>
      </div>

      <div className={styles.upcoming}>
        <h2>📅 Upcoming Bookings</h2>
        {bookings.map((b, idx) => (
          <div key={idx} className={styles.card}>
            <h3>{b.guestName}</h3>
            <p>Contact: {b.contact}</p>
            <p>Company: {b.company}</p>
            <p>Vehicle: {b.vehicleType}</p>
            <p>From: {b.pickup} → {b.drop}</p>
            <p>On: {b.date} at {b.time}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
