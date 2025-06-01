# Clover Server – How to Start the Firebase Emulator

## Requirements

* **Node.js**: v22 
* **Java**: Make sure Java is installed and added to your system’s `PATH`.


## First-Time Setup for Firebase Emulator

1. **Install Firebase CLI**
   If this is your first time running the Firebase Emulator, make sure `firebase-tools` is installed globally:

   ```bash
   npm install -g firebase-tools
   ```

2. **Navigate to the `functions` directory**
   Before installing dependencies or running the emulator, change to the `functions` folder:

   ```bash
   cd ./functions/
   ```

3. **Install dependencies**
   Ensure all required packages are installed:

   ```bash
   npm i
   ```

4. **Start the Firebase Emulator**
   Run the following command to start the local emulator:

   ```bash
   npm run serve
   ```
   This opens one more terminal processes:
   - One terminal shows emulator logs (you should keep this running).
   - The other is used for debugging your functions (where you entered the command).

   The following Firebase services will be emulated locally:

   * **Firestore**: Preloaded with test data for development.
   * **Storage**: Local testing for file uploads/downloads.
   * **Auth**: Local user authentication simulation.
   * **Functions**: Local execution of Firebase Cloud Functions.

   After a few moments, you should see a message in debugging terminal like:

   ```
   functions[us-central1-api]: http function initialized (http://127.0.0.1:5001/eshop-3ed25/us-central1/api).
   ```

   If you don’t see this line or encounter an error, try restarting the emulator by saving any file inside the `functions` folder (to trigger a reload).

5. **Stop the Emulator**
   To stop the emulator, simply close the emulator terminal window or press `Ctrl + C`.


## How to Run the Firebase Emulator Again

To restart the emulator later:

1. Navigate to the `functions` directory:

   ```bash
   cd ./functions/
   ```

2. Run the emulator:

   ```bash
   npm run serve
   ```

## Additional Notes

* Ensure your Firebase project is properly configured in `firebase.json`.
* Firestore, Storage, and Auth emulators are preloaded with test data to support local development.