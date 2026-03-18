import type { Config } from "drizzle-kit";
import { resolve } from "path";

export default {
  dialect: "sqlite",
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dbCredentials: {
     url: `file:${resolve(process.cwd(), ".data/sqlite.db")}`,
  },
} satisfies Config;
