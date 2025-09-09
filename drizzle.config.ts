import type { Config } from "drizzle-kit";
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql", // This is the required parameter
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Optional: Add these for better control
  verbose: true,
  strict: true,
} satisfies Config;