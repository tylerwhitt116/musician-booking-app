const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');




//Import Routes

const authRoutes = require(`./routes/auth`);
const gigRoutes = require('./routes/gigs');
const bookingRoutes = require('./routes/bookings');
const notificationRoutes = require('./routes/notifications');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*'} });

//Middleware
app.use(express.json());
app.use(cors());

//Use Routes
app.use( '/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/notifications', notificationRoutes);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log( 'MongoDB Connected'))
.catch(err => console.log(err));

//WebSockets for Realtime Updates
io.on('connection', (socket) => {
    console.log( 'User connected');
    socket.on('notification', (data) => {
        io.emit('newNotification', data);
    });
    socket.on('disconnect', () => {
        console.log('User Disconnected')
    });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
