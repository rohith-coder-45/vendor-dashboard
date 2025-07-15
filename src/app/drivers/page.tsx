'use client';

import { useState } from 'react';
import styles from './drivers.module.css';

type Driver = {
  id: string;
  name: string;
  doj: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
};

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: 'DRV001',
      name: 'Rahul Mehra',
      doj: '2022-03-01',
      phone: '+91-9876543210',
      vehicleType: 'Sedan',
      vehicleNumber: 'MH12AB1234',
    },
  ]);

  const [form, setForm] = useState<Driver>({
    id: '',
    name: '',
    doj: '',
    phone: '',
    vehicleType: '',
    vehicleNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.id || !form.name || !form.phone) return alert('Fill all required fields!');
    setDrivers([...drivers, form]);
    setForm({ id: '', name: '', doj: '', phone: '', vehicleType: '', vehicleNumber: '' });
  };

  const handleRemove = (id: string) => {
    setDrivers(drivers.filter((d) => d.id !== id));
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>👨‍✈️ Driver Management</h1>

      <div className={styles.form}>
        <input type="text" name="id" placeholder="Employee ID" value={form.id} onChange={handleChange} />
        <input type="text" name="name" placeholder="Driver Name" value={form.name} onChange={handleChange} />
        <input type="date" name="doj" placeholder="Date of Joining" value={form.doj} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
        <input type="text" name="vehicleType" placeholder="Vehicle Type" value={form.vehicleType} onChange={handleChange} />
        <input type="text" name="vehicleNumber" placeholder="Vehicle Number" value={form.vehicleNumber} onChange={handleChange} />
        <button onClick={handleAdd}>Add Driver</button>
      </div>

      <div className={styles.driverList}>
        {drivers.map((driver) => (
          <div key={driver.id} className={styles.card}>
            <h3>{driver.name}</h3>
            <p>ID: {driver.id}</p>
            <p>Phone: {driver.phone}</p>
            <p>Vehicle: {driver.vehicleType} - {driver.vehicleNumber}</p>
            <p>Joined: {driver.doj}</p>
            <button onClick={() => handleRemove(driver.id)}>Remove</button>
          </div>
        ))}
      </div>
    </main>
  );
}
