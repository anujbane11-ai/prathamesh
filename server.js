const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('User Connected: ' + socket.id);

    socket.on('send_message', (data) => {
        // युजरचा मेसेज एडमिनला पाठवा किंवा इथेच रिप्लाय द्या
        console.log("Message received:", data.text);
        
        // इथून तुम्ही स्वतः किंवा AI रिप्लाय देऊ शकता
        socket.emit('receive_message', {
            text: "Thanks for messaging! Our artist will contact you soon.",
            sender: "bot"
        });
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));