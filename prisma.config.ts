import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "src/generated/prisma",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
