# SwiftPay

SwiftPay is a mobile application designed to facilitate secure and fast transactions, allowing users to send and receive payments, view transaction histories, check balances, and more. It is built using **React Native** for the frontend and **Spring Boot** for the backend.

## Features

- **Send and Receive Payments**: Easily transfer money between accounts.
- **View Transactions**: Track your payment history in a user-friendly format.
- **Check Balance**: Instantly check the balance of your account.
- **Self Transfer**: Transfer money between your own accounts.
- **Voice Assistant**: Control the app using voice commands.
- **QR Code Support**: Receive payments via QR codes.

## Screens

1. **Home Screen**
   - Displays user options like Pay, Receive, Check Balance, and Self Transfer.
   - Shows recent transactions.
   
2. **Pay Screen**
   - Allows users to make payments.

3. **Receive Screen**
   - Displays a QR code for others to scan and make payments.

4. **Balance Screen**
   - Shows the current balance of the user’s account.

## Technology Stack

### Frontend

- **React Native**: Cross-platform mobile development.
- **Expo**: Used for simplifying the development process.
- **TypeScript**: Type safety and better development experience.
- **React Navigation**: For handling navigation between screens.
- **Expo Speech & Audio**: For enabling voice input and output.
- **QRCode Support**: `react-native-qrcode-svg` for generating QR codes.

### Backend

- **Spring Boot**: Backend for managing and processing transactions (not covered in this README).

## Installation and Setup

### Prerequisites

- **Node.js** (>= 12.x)
- **npm** or **yarn**
- **Expo CLI** installed globally.
  
  ```bash
  npm install -g expo-cli
  ```

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/SwiftPay.git
   cd SwiftPay
   ```

2. Install the dependencies:

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. Install any additional packages like `react-native-qrcode-svg`:

   Using npm:
   ```bash
   npm install react-native-qrcode-svg
   ```

   Or using yarn:
   ```bash
   yarn add react-native-qrcode-svg
   ```

4. Start the development server:

   ```bash
   expo start
   ```

5. Run the app on a device or emulator:

   - For iOS:
     ```bash
     npm run ios
     ```
   - For Android:
     ```bash
     npm run android
     ```

## Usage

- **Pay**: Navigate to the "Pay" screen and input the required details to send money.
- **Receive**: Go to the "Receive" screen to view your QR code, which others can scan to pay you.
- **Voice Assistant**: Use the built-in voice assistant to control actions like checking balance, sending payments, etc.
- **Transactions**: View past transactions directly on the home screen.
