import { NextResponse } from 'next/server';
import { initializeLavaSDK } from '../../../utils/lavaSDK';

export async function GET() {
    try {
      const lavaSDK = await initializeLavaSDK();
      if (!lavaSDK) {
        throw new Error("Failed to initialize Lava SDK");
      }
      
      const response = await lavaSDK.sendRelay({
        chainId: 'osmosis-1',
        method: 'GET',
        url: '/osmosis/gamm/v1beta1/pools',
        connectionType: 'rest',
      });
  
      const poolsWithBalances = await Promise.all(response.data.pools.map(async (pool: any) => {
        const balanceResponse = await lavaSDK.sendRelay({
          chainId: 'osmosis-1',
          method: 'GET',
          url: `/bank/balances/${pool.address}`,
          connectionType: 'rest',
        });
        return {
          id: pool.id,
          address: pool.address,
          denom: pool.poolAssets[0].token.denom,
          balance: balanceResponse.data.balances[0] || { amount: '0', denom: 'unknown' },
        };
      }));
  
      console.log(poolsWithBalances, 'poolsWithBalances');
  
      return NextResponse.json(poolsWithBalances);
    } catch (error: any) {
      console.error('Error in GET request:', error);
      console.error('Error details:', error.response?.data || error.message);
      return NextResponse.json({ error: 'Failed to fetch Osmosis pools', details: error.message }, { status: 500 });
    }
  }