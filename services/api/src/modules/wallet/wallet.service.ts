import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getWallet(userId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async getTransactionHistory(userId: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const transactions = await this.prisma.walletTransaction.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.walletTransaction.count({
      where: { userId },
    });

    return {
      data: transactions,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async addCredits(userId: string, amount: number, description: string) {
    const wallet = await this.getWallet(userId);

    const newBalance = wallet.balance.plus(amount);

    await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: newBalance,
        totalEarned: wallet.totalEarned.plus(amount),
      },
    });

    await this.prisma.walletTransaction.create({
      data: {
        userId,
        walletId: wallet.id,
        type: 'ADMIN_ADJUSTMENT',
        amount: new Decimal(amount),
        status: 'COMPLETED',
        description,
        balanceBefore: wallet.balance,
        balanceAfter: newBalance,
      },
    });

    return this.getWallet(userId);
  }
}
