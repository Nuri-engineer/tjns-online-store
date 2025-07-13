// const app = require('./app');
// require('dotenv').config();

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const app = require('./app');
require('dotenv').config();
const { Chat, User } = require('../db/models');

const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const server = createServer(app);


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('🟢 Socket подключён:', socket.id);

  socket.on('join', (chatId) => {
    socket.join(`chat_${chatId}`);
    console.log(`👤 Вошёл в чат chat_${chatId}`);
  });

  socket.on('join-as-admin', async (adminId) => {

    const admin = await User.findByPk(adminId);
    if (!admin || (admin.status !== 'admin' && admin.status !== 'superadmin')) {
      console.log('❌ Доступ запрещён');
      return;
    }

    const chats = await Chat.findAll();
    chats.forEach(chat => {
      socket.join(`chat_${chat.id}`);
    });
    console.log('🔐 Админ подключился ко всем чатам');
  });

  socket.on('message', (data) => {
    console.log('📩 message:', data);
    io.to(`chat_${data.chatId}`).emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket отключён:', socket.id);
  });
})

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO работает на порту ${PORT}`);
})