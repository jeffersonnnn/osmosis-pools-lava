/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      LAVA_PROJECT_ID: process.env.LAVA_PROJECT_ID,
      LAVA_CONSUMER_ADDRESS: process.env.LAVA_CONSUMER_ADDRESS,
      OSMOSIS_CONTRACT_ADDRESS: process.env.OSMOSIS_CONTRACT_ADDRESS,
    },
  };
  
  export default nextConfig;