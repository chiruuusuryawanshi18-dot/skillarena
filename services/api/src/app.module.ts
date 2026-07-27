import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GamesModule } from './modules/games/games.module';
import { MatchesModule } from './modules/matches/matches.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { AdminModule } from './modules/admin/admin.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CacheModule,
    LoggerModule,
    AuthModule,
    UsersModule,
    GamesModule,
    MatchesModule,
    WalletModule,
    LeaderboardModule,
    AdminModule,
    NotificationsModule,
  ],
})
export class AppModule {}
