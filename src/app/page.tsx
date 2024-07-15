'use client';

import { useState, useEffect } from 'react';
import OsmosisPools from '../components/OsmosisPools';

interface Pool {
  id: string;
  address: string;
  denom: string;
  balance: {
    amount: string;
    denom: string;
  };
}

export default function Home() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPools() {
      try {
        const response = await fetch('/api/osmosis-pools');
        if (!response.ok) {
          throw new Error('Failed to fetch pools');
        }
        const data = await response.json();
        setPools(data);
      } catch (err) {
        console.error('Error fetching Osmosis pools:', err);
        setError('Failed to fetch Osmosis pools');
      } finally {
        setLoading(false);
      }
    }

    fetchPools();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <OsmosisPools pools={pools} />;
}