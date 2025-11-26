'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/transactions');
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <p>Redirecting to transactions page...</p>
    </div>
  );
}