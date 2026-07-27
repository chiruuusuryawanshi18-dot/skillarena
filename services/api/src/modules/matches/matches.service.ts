import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async createMatch(gameId: string, player1Id: string, player2Id: string) {
    if (player1Id === player2Id) {
      throw new BadRequestException('Cannot play against yourself');
    }

    // Get game details
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    // Check wallets
    const player1Wallet = await this.prisma.wallet.findUnique({
      where: { userId: player1Id },
    });

    const player2Wallet = await this.prisma.wallet.findUnique({
      where: { userId: player2Id },
    });

    if (!player1Wallet || player1Wallet.balance < game.baseEntryFee) {
      throw new BadRequestException('Player 1 insufficient balance');
    }

    if (!player2Wallet || player2Wallet.balance < game.baseEntryFee) {
      throw new BadRequestException('Player 2 insufficient balance');
    }

    // Create match
    const match = await this.prisma.match.create({
      data: {
        gameId,
        player1Id,
        player2Id,
        status: 'PENDING',
        entryFee: new Decimal(game.baseEntryFee),
        prizePool: new Decimal(game.baseEntryFee * 2),
      },
    });

    // Deduct entry fees from wallets
    await this.prisma.wallet.update({
      where: { id: player1Wallet.id },
      data: {
        balance: player1Wallet.balance.minus(game.baseEntryFee),
      },
    });

    await this.prisma.wallet.update({
      where: { id: player2Wallet.id },
      data: {
        balance: player2Wallet.balance.minus(game.baseEntryFee),
      },
    });

    return match;
  }

  async startMatch(matchId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        status: 'IN_PROGRESS',
        startedAt: new Date(),
      },
    });
  }

  async endMatch(matchId: string, winnerId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    const winnersReward = match.prizePool.times(0.9);
    const losersReward = match.prizePool.times(0.1);

    // Update match
    await this.prisma.match.update({
      where: { id: matchId },
      data: {
        status: 'COMPLETED',
        outcome: 'WIN',
        winnerId,
        endedAt: new Date(),
        winnersReward,
        losersReward,
      },
    });

    // Update wallets
    const winnerWallet = await this.prisma.wallet.findUnique({
      where: { userId: winnerId },
    });

    const loser = match.player1Id === winnerId ? match.player2Id : match.player1Id;
    const loserWallet = await this.prisma.wallet.findUnique({
      where: { userId: loser },
    });

    if (winnerWallet) {
      await this.prisma.wallet.update({
        where: { id: winnerWallet.id },
        data: {
          balance: winnerWallet.balance.plus(winnersReward),
          totalEarned: winnerWallet.totalEarned.plus(winnersReward),
        },
      });
    }

    if (loserWallet) {
      await this.prisma.wallet.update({
        where: { id: loserWallet.id },
        data: {
          balance: loserWallet.balance.plus(losersReward),
          totalEarned: loserWallet.totalEarned.plus(losersReward),
        },
      });
    }

    return this.prisma.match.findUnique({
      where: { id: matchId },
    });
  }

  async getMatchHistory(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const matches = await this.prisma.match.findMany({
      where: {
        OR: [
          { player1Id: userId },
          { player2Id: userId },
        ],
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        game: { select: { name: true } },
      },
    });

    const total = await this.prisma.match.count({
      where: {
        OR: [
          { player1Id: userId },
          { player2Id: userId },
        ],
      },
    });

    return {
      data: matches,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
