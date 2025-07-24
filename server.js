require('dotenv').config();
const config = require('./config/config');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')());
app.use(express.urlencoded({ extended: true }));

// Import routes
const apiAuthRoutes = require('./routes/api/auth');
const apiNotificationRoutes = require('./routes/api/notification');
app.use('/api/auth', apiAuthRoutes);
app.use('/api/notifications', apiNotificationRoutes);

// Page routes (EJS views)
const pageAuthRoutes = require('./routes/pages/auth');
const pageNotificationRoutes = require('./routes/pages/notification');
app.use('/', pageAuthRoutes);
app.use('/notifications', pageNotificationRoutes);

// Socket.IO setup
const onlineUsers = new Map();
io.on('connection', (socket) => {
  socket.on('userOnline', (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log('online', onlineUsers)
  });
  socket.on('disconnect', () => {
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) onlineUsers.delete(userId);
    }
    console.log(onlineUsers)
  });
});

app.set('onlineUsers', onlineUsers);
app.set('io', io);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

const PORT = config.port;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
