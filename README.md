

# 🚀 Notification Service for Remote Teams

This project is a full-stack notification system for remote teams, featuring real-time updates, role-based access, and email alerts for offline users and managers.

## Features
- Role-based user management (Manager/User)
- JWT authentication
- Real-time notifications (Socket.IO)
- Priority-based notifications (High/Normal) using constants
- Email notifications for offline users and managers (SMTP)
- EJS-based UI styled with Tailwind CSS
- MongoDB for persistent storage

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud)

### Backend Setup
1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone <repo-url>
   cd notification-service/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.sample` to `.env` and fill in your environment variables:
   - `MONGO_URI` (MongoDB connection string)
   - `JWT_SECRET` (JWT signing secret)
   - `EMAIL_USER` (SMTP email username)
   - `EMAIL_PASS` (SMTP email password)
   - `SMTP_HOST` (SMTP server host)
   - `SMTP_PORT` (SMTP server port)
   - `FROM_EMAIL` (Sender email address)
   - `PORT` (default: 3000)
   - `HOST` (default: localhost)
   - `ENVIRONMENT` (development/production)
4. Start the backend server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env` file in the `backend` directory. Example:
```
MONGO_URI=mongodb://admin:admin123@localhost:27017/notification_db?authSource=admin
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
SMTP_HOST=smtp.com
SMTP_PORT=587
FROM_EMAIL=your_email@gmail.com
PORT=3000
HOST=localhost
ENVIRONMENT=development
```

---

## Usage
1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Sign up as a user or manager.
3. Managers can send notifications with priority (High/Normal).
4. Offline users/managers will receive email alerts for high-priority notifications.

---

## Project Structure

```
backend/
  config/
  controllers/
  middleware/
  models/
  public/
  routes/
  services/
  utils/
  views/
  package.json
  README.md
  .env.sample
```

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
MIT
