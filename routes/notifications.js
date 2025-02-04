const express = require('express');
const Notification = require('../models/Notification');
const router = express.Router();

//Get Notifications
router.get('/:userId', async (req, res) => {
    try{
        const notifications = await Notification.find({ userId: req.paramas.userId})
        res.json(notifications);
    } catch(error) {
        res.status(500).json({ message: 'Error fetching notifications'})
    }
});

//Mark Notification as Read

router.post('/mark-read/:id', async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, {isRead: true});
        res.json({ message: 'Notification marked as read'});
    } catch(error){
        res.status(500).json({ message: 'Error updating notification'});
    }
});

module.exports = router;