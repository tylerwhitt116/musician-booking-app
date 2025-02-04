const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


//User Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword})
        await user.save();
        res.json({ message: 'User registered successfully'})
    } catch(error){
        res.status(500).json({ message: 'Error registering user'})
    }
});

module.exports = router;