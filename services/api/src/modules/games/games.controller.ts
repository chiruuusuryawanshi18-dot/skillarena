import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GamesService } from './games.service';

@ApiTags('Games')
@Controller('api/v1/games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all games' })
  async getAllGames(@Query('type') type?: string) {
    return this.gamesService.getAllGames(type);
  }

  @Get(':gameId')
  @ApiOperation({ summary: 'Get game by ID' })
  async getGame(@Param('gameId') gameId: string) {
    return this.gamesService.getGameById(gameId);
  }

  @Get(':gameId/stats')
  @ApiOperation({ summary: 'Get game statistics' })
  async getGameStats(@Param('gameId') gameId: string) {
    return this.gamesService.getGameStats(gameId);
  }
}
