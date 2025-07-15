'use client';

import { useState, useEffect } from 'react';
import styles from './profile.module.css';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('vendor_profile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('vendor_profile', JSON.stringify(profile));
    alert('✅ Profile updated!');
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>👤 Edit Profile</h1>

      <div className={styles.form}>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          name="company"
          value={profile.company}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </main>
  );
}
