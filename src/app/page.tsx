import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <h1 className={styles.heading}>🚖 Vendor Dashboard</h1>
        <p className={styles.subheading}>Manage drivers, vehicles, bookings, and more</p>

        <div className={styles.buttons}>
          <a href="/bookings" className={styles.btn}>📋 View All Bookings</a>
          <a href="/drivers" className={styles.btn}>👨‍✈️ Driver Management</a>
          <a href="/vehicles" className={styles.btn}>🚗 Vehicle Management</a>
          <a href="/manual-booking" className={styles.btn}>✍️ Manual Booking</a>
        </div>
      </main>
    </div>
  );
}
