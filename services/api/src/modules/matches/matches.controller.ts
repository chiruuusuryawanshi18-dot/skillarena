import { Controller, Post, Get, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtGuard } from '../../common/guards/jwt.guard';

@ApiTags('Matches')
@Controller('api/v1/matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new match' })
  async createMatch(
    @CurrentUser() user: any,
    @Body() body: { gameId: string; player2Id: string },
  ) {
    return this.matchesService.createMatch(body.gameId, user.id, body.player2Id);
  }

  @Post(':matchId/start')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start a match' })
  async startMatch(@Param('matchId') matchId: string) {
    return this.matchesService.startMatch(matchId);
  }

  @Post(':matchId/end')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'End match and determine winner' })
  async endMatch(
    @Param('matchId') matchId: string,
    @Body() body: { winnerId: string },
  ) {
    return this.matchesService.endMatch(matchId, body.winnerId);
  }

  @Get('history')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get match history' })
  async getHistory(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.matchesService.getMatchHistory(user.id, page, limit);
  }
}
