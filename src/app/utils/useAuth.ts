'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('vendor_token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);
}
