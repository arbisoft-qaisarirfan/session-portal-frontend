import path from "path";

import { test as baseTest } from "@playwright/test";

export * from "@playwright/test";

export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browserName }, use) => {
      const fileName = path.resolve("playwright", ".auth/user.json");
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
