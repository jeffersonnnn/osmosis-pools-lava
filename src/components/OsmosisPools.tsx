import { useState, useEffect } from 'react';

interface Pool {
    id: string;
    denom: string;
    balance: {
        amount: string;
        denom: string;
    };
}

interface OsmosisPoolsProps {
    initialPools: Pool[];
}

export default function OsmosisPools({ initialPools }: OsmosisPoolsProps) {
    const [pools, setPools] = useState<Pool[]>(initialPools);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPools() {
            if (initialPools.length === 0) {
                setIsLoading(true);
                try {
                    const response = await fetch('/api/osmosis-pools');
                    const data = await response.json();
                    setPools(data);
                } catch (error) {
                    console.error('Error fetching pools:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }

        fetchPools();
    }, [initialPools]);

    if (isLoading) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Top Osmosis Pools</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pools.map((pool) => (
              <div key={pool.id} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">Pool {pool.id}</h2>
                <p className="text-gray-600">Token: {pool.denom}</p>
                <p className="text-gray-600">Balance: {pool.balance.amount} {pool.balance.denom}</p>
              </div>
            ))}
          </div>
        </div>
      );
}