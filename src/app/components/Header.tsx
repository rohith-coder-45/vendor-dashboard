'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('vendor_token');
    setLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('vendor_token');
    router.push('/login');
  };

  const switchAccount = () => {
    localStorage.removeItem('vendor_token');
    localStorage.removeItem('vendor_profile');
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>🚖 Vendor Dashboard</div>

      {loggedIn && (
        <div className={styles.profileSection}>
          <div className={styles.avatar} onClick={() => setOpen(!open)}>
            👤
          </div>

          {open && (
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownItem}
                onClick={() => router.push('/profile')}
              >
                📝 Edit Profile
              </div>
              <div className={styles.dropdownItem} onClick={switchAccount}>
                🔄 Switch Account
              </div>
              <div className={styles.dropdownItem} onClick={logout}>
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
