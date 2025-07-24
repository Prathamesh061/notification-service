const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notificationController');
const auth = require('../../middleware/auth');
const managerOnly = require('../../middleware/managerOnly');

router.post('/', auth, managerOnly, notificationController.createNotification);
router.get('/', auth, notificationController.getNotifications);

module.exports = router;
