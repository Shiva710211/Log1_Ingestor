require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const setupLogIngestor = require('./src/log');
const queryInterface = require('./src/queryinterface');
const { authMiddleware, generateToken } = require('./auth/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = {
        admin: { password: 'adminpass', role: 'admin' },
        user: { password: 'userpass', role: 'user' },
    };
    const user = users[username];
    if (user && user.password === password) {
        const token = generateToken({ username, role: user.role });
        console.log(`Login successful for user: ${username}, token: ${token}`);
        res.json({ token });
    } else {
        console.log(`Login failed for user: ${username}`);
        res.status(401).send('Invalid credentials.');
    }
});


app.use('/log', authMiddleware('admin'), setupLogIngestor(io));
app.use('/', authMiddleware('user'), queryInterface);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
