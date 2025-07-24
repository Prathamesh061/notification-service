const express = require('express');
const router = express.Router();

const axios = require('axios');
const config = require('../../config/config');
const authMiddleware = require('../../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/notifications`, {
            headers: { Authorization: `Bearer ${req.cookies.token}` }
        });
        // Ensure senderName is present for each notification
        const notifications = response.data.map(n => ({
            ...n,
            senderName: (n.createdBy && n.createdBy.name) || 'Unknown'
        }));

        res.render('notifications', {
            notifications,
            role: req.cookies.role,
            userId: req?.user?.userId
        });
    } catch {
        res.render('notifications', { notifications: [], role: req.cookies.role });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    if (req.cookies.role !== 'Manager') return res.status(403).send('Forbidden');
    try {
        await axios.post(`${config.apiBaseUrl}/notifications`, req.body, {
            headers: { Authorization: `Bearer ${req.cookies.token}` }
        });
        res.redirect('/notifications');
    } catch (err) {
        res.redirect('/notifications');
    }
});

module.exports = router;
