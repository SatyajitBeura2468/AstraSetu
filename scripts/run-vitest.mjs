import { startVitest } from "vitest/node";

import vitestConfig from "../vitest.config.mjs";

const root = process.cwd();
const filter = process.argv.slice(2);
const { test: testConfig = {}, ...viteConfig } = vitestConfig;

const ctx = await startVitest(
  "test",
  filter,
  {
    ...testConfig,
    config: false,
    root,
    run: true,
  },
  viteConfig,
);

if (!ctx) {
  process.exit(1);
}

const failedTests = ctx.state.getCountOfFailedTests();
await ctx.close();
process.exit(failedTests > 0 ? 1 : 0);
