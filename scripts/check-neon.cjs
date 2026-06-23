const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient({
  datasources: { db: { url: 'postgresql://neondb_owner:npg_xsfbWRXu0pG4@ep-lively-thunder-as3c20a7-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require' } },
});
(async () => {
  const users = await db.anonymousUser.count();
  const last = await db.anonymousUser.findFirst({ orderBy: { createdAt: 'desc' } });
  console.log('Total users:', users);
  console.log('Last user credits:', last?.credits);
  console.log('Last user createdAt:', last?.createdAt);
  await db.$disconnect();
})();
