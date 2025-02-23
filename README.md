# MEDITORY - Medicine Inventory & Reminder Tracking

## Overview
Meditory is a web application designed to help users efficiently track their medicine inventory and receive timely reminders for medication intake.
The application notifies users about low stock and scheduled medicine consumption, ensuring they never miss a dose.

## Features
- **Medicine Inventory Management**: Keep track of all medicines with details like name, quantity, and expiry date.
- **Stock Alerts**: Get notifications when a medicine's stock runs low.
- **Intake Reminders**: Set schedules for medicine intake and receive timely alerts.
- **Graphical Analysis**: Provides user with graphs of intaked medicine for efficient tracking.
- **Auto-updation of Intake**: After reminding the user of dose intake the web app updates the graph and intake automatically.
- **User-friendly Interface**: Simple and intuitive UI built with EJS templates.

## Tech Stack
- **Frontend**: `HTML`, `CSS`, `JavaScript`, `EJS`
- **Backend Framework**: `Express.js`
- **Backend Runtime Environment**: `Node.js`
- **Database**: `MongoDB`
- **Other Tools**: `Mongoose` (for database operations)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Jagdish-Padhi/InnoBits.git
   cd InnoBits
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up the environment variables:**
   - Create a `.env` file in the root directory.
   - Add the necessary MongoDB connection string and other environment variables.
4. **Start the server:**
   ```sh
   npm start
   ```
5. **Open the application** in your browser at `http://localhost:3000`

## Usage
1. **Register/Login** to your account.
2. **Add medicines** with name, quantity, and schedule.
3. **Get alerts** for low stock and scheduled intake.
4. **Manage inventory efficiently.**

## Contributors
- **Twinkle Gupta**
- **Jagdish Padhi**

## Repository
GitHub: [InnoBits](https://github.com/Jagdish-Padhi/InnoBits)
