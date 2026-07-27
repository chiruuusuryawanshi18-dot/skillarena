import { Injectable, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  private client: RedisClientType;
  private logger = new Logger('CacheService');

  async onModuleInit() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (err) => this.logger.error('Redis error:', err));
    this.client.on('connect', () => this.logger.log('✅ Connected to Redis'));

    await this.client.connect();
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      this.logger.error(`Error getting cache for key ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      await this.client.setEx(key, ttl || 3600, JSON.stringify(value));
    } catch (error) {
      this.logger.error(`Error setting cache for key ${key}:`, error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.error(`Error deleting cache for key ${key}:`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.client.flushDb();
    } catch (error) {
      this.logger.error('Error clearing cache:', error);
    }
  }
}
