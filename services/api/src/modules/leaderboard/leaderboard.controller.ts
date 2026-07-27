import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LeaderboardService } from './leaderboard.service';

@ApiTags('Leaderboard')
@Controller('api/v1/leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get('global')
  @ApiOperation({ summary: 'Get global leaderboard' })
  async getGlobalLeaderboard(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.leaderboardService.getGlobalLeaderboard(page, limit);
  }

  @Get('game/:gameId')
  @ApiOperation({ summary: 'Get game leaderboard' })
  async getGameLeaderboard(
    @Param('gameId') gameId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.leaderboardService.getGameLeaderboard(gameId, page, limit);
  }

  @Get('rank/:userId')
  @ApiOperation({ summary: 'Get user rank' })
  async getUserRank(
    @Param('userId') userId: string,
    @Query('gameId') gameId?: string,
  ) {
    return this.leaderboardService.getUserRank(userId, gameId);
  }
}
