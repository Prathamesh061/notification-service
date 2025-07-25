


# 🚀 Notification System for Remote Teams

This project is a full-stack notification system for remote teams, featuring real-time updates, role-based access, and email alerts for offline users and managers.

## Live Demo

- 🌐 [Deployed App on Render](https://notification-service-tn15.onrender.com/)
- 💻 [Source Code on GitHub](https://github.com/Prathamesh061/notification-service)

---

## How to Use (Deployed App)

1. Visit [https://notification-service-tn15.onrender.com/](https://notification-service-tn15.onrender.com/)
2. Sign up as a **Manager** or **User** (choose your role during signup)
3. Log in with your credentials
4. **Managers** can create notifications (choose priority: normal or high)
5. All logged-in users (including managers) will see notifications in real time
6. If a notification is high priority and a user is offline, an email will be sent to them
7. Normal notifications auto-delete after 2 days; high-priority notifications persist

---

## How to Run Locally

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or cloud)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Prathamesh061/notification-service.git
   cd notification-service
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
5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

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

## Machine Test Requirements (Implemented)

- Sign Up flow with role selector (Manager/User)
- JWT-based login/authentication
- Role-based API protection
- Managers can create notifications (message, priority)
- Real-time notification feed for all users (Socket.IO)
- Notifications saved in MongoDB
- Normal notifications auto-delete after 2 days
- High-priority notifications persist
- Email simulation for offline users (console log or real email)
- Single notification feed for all users
- Priority badge (red for High, gray for Normal)
- Feed auto-refreshes (real-time)
- Role-based access (Managers: add, Users: view)
- .env sample provided

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
