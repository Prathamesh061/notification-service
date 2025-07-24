const Notification = require('../models/Notification');
const User = require('../models/User');
const emailService = require('../services/emailService');
const { PRIORITY } = require('../utils/constants');

exports.createNotification = async (req, res) => {
    const { message, priority } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        const notification = new Notification({ message, priority, createdBy: req.user.userId, senderName: user.name });
        await notification.save();
        // Real-time emit
        const io = req.app.get('io');
        io.emit('newNotification', notification);
        // Email service for high priority
        if (priority === PRIORITY.HIGH) {
            const onlineUsers = req.app.get('onlineUsers');
            // Get all users and managers
            const allRecipients = await User.find();
            // Filter out online users
            const offlineRecipients = allRecipients.filter(u => !onlineUsers.has(u._id.toString()));
            await emailService.sendHighPriorityEmails(offlineRecipients, notification);
        }
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notificationsRaw = await Notification.find()
            .sort({ createdAt: -1 })
            .populate('createdBy', 'name')
            .exec();
        const notifications = notificationsRaw.map(n => ({
            ...n.toObject(),
            senderName: n.senderName || (n.createdBy && n.createdBy.name) || 'Unknown'
        }));
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
