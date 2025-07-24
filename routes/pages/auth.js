const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../../config/config');

function isLoggedIn(req) {
    return req.cookies && req.cookies.token;
}

router.get('/', (req, res) => {
    if (isLoggedIn(req)) {
        return res.redirect('/notifications');
    }
    return res.redirect('/login');
});

router.get('/signup', (req, res) => {
    if (isLoggedIn(req)) {
        return res.redirect('/notifications');
    }
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    if (isLoggedIn(req)) {
        return res.redirect('/notifications');
    }
    try {
        await axios.post(`${config.apiBaseUrl}/auth/signup`, req.body);
        res.redirect('/login');
    } catch (err) {
        res.render('signup', { error: err.response?.data?.message });
    }
});

router.get('/login', (req, res) => {
    if (isLoggedIn(req)) {
        return res.redirect('/notifications');
    }
    res.render('login');
});

router.post('/login', async (req, res) => {
    if (isLoggedIn(req)) {
        return res.redirect('/notifications');
    }
    try {
        const response = await axios.post(`${config.apiBaseUrl}/auth/login`, req.body);
        res.cookie('token', response.data.token);
        res.cookie('role', response.data.user.role);
        res.redirect('/notifications');
    } catch (err) {
        res.render('login', { error: err.response?.data?.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('role');
    res.redirect('/login');
});

module.exports = router;
