import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import { createClient } from 'redis';

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.SOCKET_PORT || 3002;

// Redis client for pub/sub
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('✅ Connected to Redis'));

// User sessions
const userSessions = new Map<string, string>();
const matchRooms = new Map<string, Set<string>>();

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Join lobby
  socket.on('join-lobby', (data) => {
    const { userId, gameId } = data;
    userSessions.set(userId, socket.id);
    socket.join('lobby');
    socket.join(`game:${gameId}`);

    io.emit('user-online', {
      userId,
      socketId: socket.id,
      timestamp: new Date(),
    });

    console.log(`User ${userId} joined lobby`);
  });

  // Create match
  socket.on('create-match', (data) => {
    const { matchId, player1Id, player2Id, gameId } = data;

    if (!matchRooms.has(matchId)) {
      matchRooms.set(matchId, new Set());
    }

    socket.join(`match:${matchId}`);
    matchRooms.get(matchId)?.add(socket.id);

    io.to(`match:${matchId}`).emit('match-created', {
      matchId,
      player1Id,
      player2Id,
      gameId,
      status: 'PENDING',
      timestamp: new Date(),
    });

    console.log(`Match ${matchId} created`);
  });

  // Start match
  socket.on('start-match', (data) => {
    const { matchId } = data;
    io.to(`match:${matchId}`).emit('match-started', {
      matchId,
      timestamp: new Date(),
    });
    console.log(`Match ${matchId} started`);
  });

  // Player move
  socket.on('move', (data) => {
    const { matchId, playerId, move } = data;
    io.to(`match:${matchId}`).emit('player-move', {
      playerId,
      move,
      timestamp: new Date(),
    });
  });

  // Match update
  socket.on('match-update', (data) => {
    const { matchId, ...update } = data;
    io.to(`match:${matchId}`).emit('match-updated', {
      matchId,
      ...update,
      timestamp: new Date(),
    });
  });

  // End match
  socket.on('end-match', (data) => {
    const { matchId, winnerId, finalScore } = data;
    io.to(`match:${matchId}`).emit('match-ended', {
      matchId,
      winnerId,
      finalScore,
      timestamp: new Date(),
    });

    matchRooms.delete(matchId);
    console.log(`Match ${matchId} ended, winner: ${winnerId}`);
  });

  // Send notification
  socket.on('send-notification', (data) => {
    const { userId, type, title, message } = data;
    const targetSocket = Array.from(userSessions.entries()).find(
      ([uid]) => uid === userId,
    )?.[1];

    if (targetSocket) {
      io.to(targetSocket).emit('notification', {
        type,
        title,
        message,
        timestamp: new Date(),
      });
    }
  });

  // Disconnect
  socket.on('disconnect', () => {
    // Remove user session
    for (const [userId, socketId] of userSessions.entries()) {
      if (socketId === socket.id) {
        userSessions.delete(userId);
        io.emit('user-offline', {
          userId,
          timestamp: new Date(),
        });
        console.log(`User ${userId} went offline`);
        break;
      }
    }

    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Get online users
app.get('/api/online-users', (req, res) => {
  res.json({
    onlineUsers: userSessions.size,
    activeMatches: matchRooms.size,
  });
});

server.listen(PORT, () => {
  console.log(`✅ Socket.IO Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
