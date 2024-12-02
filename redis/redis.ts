import { Redis } from "ioredis";

export class RedisManager {
  static instance: Redis;

  getInstance: () => Redis = () => {
    if (!RedisManager.instance) RedisManager.instance = new Redis();
    return RedisManager.instance;
  };
}

export const redisManager = new RedisManager();

export const redisClient = redisManager.getInstance();
