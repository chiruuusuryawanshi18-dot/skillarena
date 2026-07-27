# SkillArena - Skill-Based Gaming Platform

## 🎮 Overview

SkillArena is a comprehensive skill-based gaming platform where users can compete in various games, win demo credits, climb leaderboards, and showcase their gaming prowess. Built with modern technologies for performance, scalability, and security.

### Key Features

- 🎯 **Multiple Games**: Chess, Quiz Battle, Carrom, Esports, and more
- 🏆 **Leaderboards**: Global and game-specific rankings
- 💰 **Wallet System**: Demo credits for playing without real money
- ⚡ **Real-time Updates**: Socket.IO for live match updates
- 📱 **Multi-platform**: Web, Mobile (Flutter), and Admin Dashboard
- 🔐 **Secure**: JWT authentication, encrypted passwords, rate limiting
- 📊 **Admin Panel**: Complete platform management
- 🎯 **Matchmaking**: Fair competition with rating system

## 🛠️ Tech Stack

### Frontend
- **Web**: Next.js 14, TypeScript, Tailwind CSS, Zustand
- **Mobile**: Flutter 3.10+, Riverpod
- **Admin**: Next.js 14, React Query

### Backend
- **API**: NestJS, PostgreSQL, Prisma ORM
- **Real-time**: Socket.IO
- **Cache**: Redis
- **Authentication**: JWT

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD
- Nginx (production)

## 📋 Prerequisites

- Node.js 18+
- Docker & Docker Compose (recommended)
- PostgreSQL 14+ (if not using Docker)
- Redis 7+ (if not using Docker)
- Flutter 3.10+ (for mobile development)

## 🚀 Quick Start

### Using Docker Compose (Recommended)

```bash
# 1. Clone repository
git clone https://github.com/chiruuusuryawanshi18-dot/SkillArena.git
cd SkillArena

# 2. Setup environment
cp .env.example .env

# 3. Start all services
docker compose up -d

# 4. Initialize database
npx prisma migrate dev
npx prisma db seed

# 5. Access applications
# Web: http://localhost:3000
# API Docs: http://localhost:3001/api/docs
# Admin: http://localhost:3003
# Socket: http://localhost:3002
```

### Manual Setup

```bash
# Install dependencies
npm install

# API Server
cd services/api
npm install
npm run dev

# Socket Server (new terminal)
cd services/socket
npm install
npm run dev

# Web App (new terminal)
cd apps/web
npm install
npm run dev

# Admin (new terminal)
cd apps/admin
npm install
npm run dev
```

## 📁 Project Structure

```
SkillArena/
├── apps/
│   ├── web/              # Next.js web application
│   ├── admin/            # Admin dashboard
│   └── mobile/           # Flutter mobile app
├── services/
│   ├── api/              # NestJS REST API
│   └── socket/           # Socket.IO server
├── database/
│   ├── schema.prisma     # Database schema
│   └── seeds/            # Database seeds
├── docker/               # Docker configurations
├── .github/workflows/    # CI/CD pipelines
├── docs/                 # Documentation
└── docker-compose.yml    # Docker Compose
```

## 📚 Documentation

- [Architecture](./docs/ARCHITECTURE.md) - System design and overview
- [API Documentation](./docs/API.md) - Complete API reference
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production deployment
- [Developer Guide](./docs/DEVELOPER.md) - Development workflow

## 🎮 Game Types

1. **Chess** - Classic chess game with rating
2. **Quiz Battle** - Competitive quizzes
3. **Carrom** - Virtual carrom board
4. **Esports** - Tournament-based competitions
5. **Skill Challenge** - Time-based challenges

## 💳 Wallet System

- **Demo Credits**: 1000 initial credits for new users
- **Entry Fees**: Variable by game
- **Rewards**: Win percentage-based
- **Transactions**: Complete history

## 🏆 Leaderboard Features

- Global rankings
- Game-specific leaderboards
- Rating system (ELO-based)
- Monthly challenges
- Achievement badges

## 🔐 Security Features

- JWT authentication with refresh tokens
- Password hashing (bcrypt)
- CORS protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- Role-based access control
- Audit logging

## 📊 Admin Dashboard

- User management
- Game management
- Transaction monitoring
- System statistics
- User moderation
- Game analytics

## 🧪 Testing

```bash
# Backend tests
cd services/api
npm run test
npm run test:cov

# Frontend tests
cd apps/web
npm run test

# Mobile tests
cd apps/mobile
flutter test
```

## 📝 API Examples

### Register User

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password@123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Get Games

```bash
curl http://localhost:3001/api/v1/games
```

### Create Match

```bash
curl -X POST http://localhost:3001/api/v1/matches \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "gameId": "game_id",
    "player2Id": "opponent_id"
  }'
```

## 🚀 Deployment

### Production Checklist

- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] SSL certificates installed
- [ ] Nginx configured
- [ ] Monitoring setup
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Security headers enabled

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

See [Developer Guide](./docs/DEVELOPER.md) for development workflow.

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- 📧 Email: support@skillarena.com
- 💬 Discord: [Join our community](https://discord.gg/skillarena)
- 🐛 Issues: [GitHub Issues](https://github.com/chiruuusuryawanshi18-dot/SkillArena/issues)
- 📖 Docs: [Documentation](./docs/)

## 🙏 Acknowledgments

- Built with ❤️ by the SkillArena Team
- Powered by NestJS, Next.js, Flutter, and more
- Community support and contributions

## 🎯 Roadmap

- [ ] GraphQL API
- [ ] AI-powered matchmaking
- [ ] Live streaming integration
- [ ] Social features (friends, clans)
- [ ] Blockchain integration
- [ ] Mobile app release
- [ ] Advanced analytics
- [ ] Tournament system

---

⭐ If you like this project, please consider giving it a star!
