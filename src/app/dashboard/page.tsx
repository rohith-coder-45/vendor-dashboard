'use client';

import { useEffect, useState } from 'react';
import useAuth from '../utils/useAuth';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  useAuth();

  const [summary, setSummary] = useState({
    totalBookings: 0,
    completedBookings: 0,
    totalInvoices: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const manualBookings = JSON.parse(localStorage.getItem('manual_bookings') || '[]');
    const dummyBookings = [
      { id: 'BK001', status: 'Ongoing' },
      { id: 'BK002', status: 'Completed' },
    ];

    const allBookings = [...manualBookings, ...dummyBookings];
    const completed = allBookings.filter((b) => b.status === 'Completed');

    const invoices = JSON.parse(localStorage.getItem('vendor_invoices') || '[]');
    const totalAmount = invoices.reduce((sum: number, inv: any) => sum + Number(inv.amount), 0);

    setSummary({
      totalBookings: allBookings.length,
      completedBookings: completed.length,
      totalInvoices: invoices.length,
      totalRevenue: totalAmount,
    });
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>📊 Dashboard Summary</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>🗂️ Total Bookings</h2>
          <p>{summary.totalBookings}</p>
        </div>
        <div className={styles.card}>
          <h2>✅ Completed Bookings</h2>
          <p>{summary.completedBookings}</p>
        </div>
        <div className={styles.card}>
          <h2>🧾 Invoices Submitted</h2>
          <p>{summary.totalInvoices}</p>
        </div>
        <div className={styles.card}>
          <h2>💰 Total Revenue</h2>
          <p>₹{summary.totalRevenue}</p>
        </div>
      </div>
    </main>
  );
}
