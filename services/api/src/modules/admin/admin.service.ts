import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  private checkAdmin(userRole: string) {
    if (userRole !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
  }

  async getDashboardStats(userRole: string) {
    this.checkAdmin(userRole);

    const totalUsers = await this.prisma.user.count();
    const totalMatches = await this.prisma.match.count();
    const totalTransactions = await this.prisma.walletTransaction.count();
    const totalRevenue = await this.prisma.walletTransaction.aggregate({
      where: { type: 'GAME_ENTRY' },
      _sum: { amount: true },
    });

    return {
      totalUsers,
      totalMatches,
      totalTransactions,
      totalRevenue: totalRevenue._sum?.amount || 0,
    };
  }

  async getAllUsers(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    const total = await this.prisma.user.count();

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async suspendUser(userId: string, userRole: string) {
    this.checkAdmin(userRole);
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: 'SUSPENDED' },
    });
  }

  async banUser(userId: string, userRole: string) {
    this.checkAdmin(userRole);
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: 'BANNED' },
    });
  }
}
