import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getGlobalLeaderboard(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const leaderboard = await this.prisma.leaderboard.findMany({
      skip,
      take: limit,
      orderBy: { rank: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    const total = await this.prisma.leaderboard.count();

    return {
      data: leaderboard,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getGameLeaderboard(gameId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const leaderboard = await this.prisma.leaderboard.findMany({
      where: { gameId },
      skip,
      take: limit,
      orderBy: { rank: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    const total = await this.prisma.leaderboard.count({
      where: { gameId },
    });

    return {
      data: leaderboard,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserRank(userId: string, gameId?: string) {
    if (gameId) {
      return this.prisma.leaderboard.findFirst({
        where: { userId, gameId },
      });
    }

    return this.prisma.leaderboard.findFirst({
      where: { userId },
      orderBy: { rank: 'asc' },
    });
  }
}
