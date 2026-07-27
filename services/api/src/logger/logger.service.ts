import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class LoggerService {
  constructor(private prisma: PrismaService) {}

  async log(service: string, message: string, metadata?: any) {
    try {
      await this.prisma.systemLog.create({
        data: {
          level: 'INFO',
          service,
          message,
          metadata: metadata || {},
        },
      });
    } catch (error) {
      console.error('Error logging:', error);
    }
  }

  async error(service: string, message: string, metadata?: any) {
    try {
      await this.prisma.systemLog.create({
        data: {
          level: 'ERROR',
          service,
          message,
          metadata: metadata || {},
        },
      });
    } catch (error) {
      console.error('Error logging:', error);
    }
  }

  async warn(service: string, message: string, metadata?: any) {
    try {
      await this.prisma.systemLog.create({
        data: {
          level: 'WARN',
          service,
          message,
          metadata: metadata || {},
        },
      });
    } catch (error) {
      console.error('Error logging:', error);
    }
  }
}
