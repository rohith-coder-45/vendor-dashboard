'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('vendor_token');
    if (token) router.push('/bookings');
  }, [router]);

  const handleLogin = () => {
    if (email === 'vendor@example.com' && password === 'password123') {
      localStorage.setItem('vendor_token', 'mock-jwt-token');
      router.push('/bookings');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Vendor Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </main>
  );
}
