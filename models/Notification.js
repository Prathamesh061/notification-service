const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  priority: { type: String, enum: ['normal', 'high'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// TTL index for normal notifications (auto-delete after 2 days)
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800, partialFilterExpression: { priority: 'normal' } });

module.exports = mongoose.model('Notification', NotificationSchema);
