import 'dotenv/config'
import { defineConfig, env } from "prisma/config";

const dbUrl = env("DATABASE_URL");

console.log("DEBUG DATABASE_URL =", dbUrl);
console.log("DEBUG process.env.DATABASE_URL =", process.env.DATABASE_URL);


export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { 
    path: 'prisma/migrations',
  },
  datasource: { 
    url: dbUrl,
  }
});