import { LavaSDK } from '@lavanet/lava-sdk';

const projectId = process.env.LAVA_PROJECTID || 'lava@1ajlxjywlg90cfdhsnekyarzxx8anjw3sjyjj7c-devrel_dapp_task';
console.log("Initializing Lava SDK with project ID:", projectId);

let lavaSDK: LavaSDK;

async function initializeLavaSDK() {
  try {
    if (!lavaSDK) {
      lavaSDK = await LavaSDK.create({
        badge: {
          badgeServerAddress: 'https://badges.lavanet.xyz',
          projectId: projectId,
        },
        chainIds: ['osmosis-1'],
        geolocation: '2',
      });
      console.log("Lava SDK initialized successfully");
    }
    return lavaSDK;
  } catch (error: any) {
    console.error("Failed to initialize Lava SDK:", error);
    if (error.message.includes('Failed fetching badge')) {
      console.error("Badge fetching failed. Please check your project ID and network connection.");
    }
    throw error;
  }
}

export { initializeLavaSDK, lavaSDK };