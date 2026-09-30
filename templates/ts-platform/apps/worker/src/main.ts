import { Worker } from "bullmq";
import { Redis } from "ioredis";
import pino from "pino";

const logger = pino({ name: "__PROJECT_SLUG__-worker" });
const connection = new Redis(process.env.REDIS_URL ?? "redis://127.0.0.1:56379/0", {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "default",
  async (job) => {
    logger.info({ jobId: job.id, jobName: job.name }, "processing job");
    return { processedAt: new Date().toISOString() };
  },
  { connection },
);

worker.on("failed", (job, error) => logger.error({ jobId: job?.id, error }, "job failed"));
process.on("SIGTERM", async () => {
  await worker.close();
  await connection.quit();
});
