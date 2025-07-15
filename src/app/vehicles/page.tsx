'use client';

import { useState } from 'react';
import styles from './vehicles.module.css';

type Vehicle = {
  id: string;
  type: string;
  plate: string;
  model: string;
  available: boolean;
  condition: string;
  insurance: string;
};

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'VH001',
      type: 'SUV',
      plate: 'DL01XY1234',
      model: 'Hyundai Creta',
      available: true,
      condition: 'Good',
      insurance: 'Valid till Dec 2025',
    },
  ]);

  const [form, setForm] = useState<Vehicle>({
    id: '',
    type: '',
    plate: '',
    model: '',
    available: true,
    condition: '',
    insurance: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleAdd = () => {
    if (!form.id || !form.plate || !form.type) return alert('Please fill required fields!');
    setVehicles([...vehicles, form]);
    setForm({ id: '', type: '', plate: '', model: '', available: true, condition: '', insurance: '' });
  };

  const handleRemove = (id: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>🚗 Vehicle Management</h1>

      <div className={styles.form}>
        <input type="text" name="id" placeholder="Vehicle ID" value={form.id} onChange={handleChange} />
        <input type="text" name="type" placeholder="Vehicle Type" value={form.type} onChange={handleChange} />
        <input type="text" name="plate" placeholder="Plate Number" value={form.plate} onChange={handleChange} />
        <input type="text" name="model" placeholder="Model" value={form.model} onChange={handleChange} />
        <input type="text" name="condition" placeholder="Condition" value={form.condition} onChange={handleChange} />
        <input type="text" name="insurance" placeholder="Insurance Status" value={form.insurance} onChange={handleChange} />
        <label>
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          Available
        </label>
        <button onClick={handleAdd}>Add Vehicle</button>
      </div>

      <div className={styles.vehicleList}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className={styles.card}>
            <h3>{vehicle.model}</h3>
            <p>ID: {vehicle.id}</p>
            <p>Type: {vehicle.type}</p>
            <p>Plate: {vehicle.plate}</p>
            <p>Condition: {vehicle.condition}</p>
            <p>Insurance: {vehicle.insurance}</p>
            <p>Status: {vehicle.available ? 'Available' : 'Unavailable'}</p>
            <button onClick={() => handleRemove(vehicle.id)}>Remove</button>
          </div>
        ))}
      </div>
    </main>
  );
}
