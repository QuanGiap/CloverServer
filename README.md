# Clover Server

## Requirements
- **Node.js**: v18 or higher
- **Java**: Ensure Java is installed and added to your system's PATH.

## How to Run Firebase Functions
1. **Navigate to the Functions Directory**:
   Before installing dependencies or running the emulator, navigate to the `functions` directory:
   ```bash
   cd ./functions/
   ```

2. **Install Dependencies**:
   Make sure you have all the required dependencies installed. Run the following command:
   ```bash
   npm install
   ```

3. **Start Firebase Emulator**:
   To start the Firebase emulator locally, run:
   ```bash
   npm run serve
   ```

4. **Deploy Firebase Functions**:
   When you're ready to deploy the functions to Firebase, use:
   ```bash
   firebase deploy --only functions
   ```

## Additional Notes
- Ensure that your Firebase project is properly configured in the `firebase.json` file.
- Make sure your environment variables (if any) are set up correctly for both local and production environments.