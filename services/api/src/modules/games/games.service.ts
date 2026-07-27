import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async getAllGames(type?: string) {
    return this.prisma.game.findMany({
      where: type ? { type: type as any } : undefined,
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        baseEntryFee: true,
        minPlayers: true,
        maxPlayers: true,
        status: true,
        totalMatches: true,
        totalPlayers: true,
      },
    });
  }

  async getGameById(gameId: string) {
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }

  async getGameStats(gameId: string) {
    const game = await this.getGameById(gameId);

    const totalMatches = await this.prisma.match.count({
      where: { gameId },
    });

    const totalPlayers = await this.prisma.matchPlayer.findMany({
      where: { gameId },
      distinct: ['userId'],
      select: { userId: true },
    });

    return {
      ...game,
      actualTotalMatches: totalMatches,
      actualTotalPlayers: totalPlayers.length,
    };
  }
}
