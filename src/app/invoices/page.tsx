'use client';

import { useState, useEffect } from 'react';
import styles from './invoices.module.css';
import useAuth from '../utils/useAuth';

type Invoice = {
  id: string;
  bookingId: string;
  vendor: string;
  amount: string;
  date: string;
};

export default function InvoicePage() {
  useAuth();

  const [form, setForm] = useState<Invoice>({
    id: '',
    bookingId: '',
    vendor: '',
    amount: '',
    date: '',
  });

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('vendor_invoices');
    if (stored) setInvoices(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id || !form.bookingId || !form.amount) {
      return alert('Please fill all required fields');
    }

    const updated = [...invoices, form];
    setInvoices(updated);
    localStorage.setItem('vendor_invoices', JSON.stringify(updated));

    setForm({ id: '', bookingId: '', vendor: '', amount: '', date: '' });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>🧾 Invoice Submission</h1>

      <div className={styles.form}>
        <input name="id" placeholder="Invoice ID" value={form.id} onChange={handleChange} />
        <input name="bookingId" placeholder="Booking ID" value={form.bookingId} onChange={handleChange} />
        <input name="vendor" placeholder="Vendor Name" value={form.vendor} onChange={handleChange} />
        <input name="amount" placeholder="Amount (INR)" value={form.amount} onChange={handleChange} />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Invoice Date"
        />
        <button onClick={handleSubmit}>Submit Invoice</button>
      </div>

      <div className={styles.list}>
        <h2>📄 Submitted Invoices</h2>
        {invoices.map((invoice) => (
          <div key={invoice.id} className={styles.card}>
            <h3>Invoice #{invoice.id}</h3>
            <p>Booking: {invoice.bookingId}</p>
            <p>Vendor: {invoice.vendor}</p>
            <p>Amount: ₹{invoice.amount}</p>
            <p>Date: {invoice.date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
