# Osmosis Pools Lava Integration

This project integrates the Lava SDK to fetch and display Osmosis pool data.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   LAVA_PROJECTID=your_lava_project_id
   ```
   Replace `your_lava_project_id` with your actual Lava project ID.

## Usage

The `lavaSDK.ts` file initializes the Lava SDK with the provided project ID. It exports two items:

- `initializeLavaSDK`: An async function that creates and returns the Lava SDK instance.
- `lavaSDK`: The SDK instance (note: this may be undefined until `initializeLavaSDK` is called).

To use the SDK in your application:

```typescript
import { initializeLavaSDK } from '../utils/lavaSDK';

async function fetchData() {
  const sdk = await initializeLavaSDK();
  // Use sdk to make API calls
}
```

## Error Handling

The SDK initialization includes error handling for common issues, such as failed badge fetching. Check the console for detailed error messages if you encounter any problems.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
