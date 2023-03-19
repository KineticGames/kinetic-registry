import { PrismaClient } from '@prisma/client';
import * as process from 'process';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@kinetic.com' },
    update: {},
    create: {
      email: 'alice@kinetic.com',
      name: 'alice',
      packages: {
        connectOrCreate: {
          where: {
            name: 'kinetic-registry',
          },
          create: {
            name: 'kinetic-registry',
            description: 'the registry for the kinetic-package-manager',
            versions: {
              create: { versionMajor: 1, versionMinor: 0, versionPatch: 0 },
            },
          },
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@kinetic.com' },
    update: {},
    create: {
      email: 'bob@kinetic.com',
      name: 'bob',
      packages: {
        connectOrCreate: [
          {
            where: {
              name: 'kinetic-registry',
            },
            create: {
              name: 'kinetic-registry',
              description: 'the registry for the kinetic-package-manager',
              versions: {
                create: { versionMajor: 1, versionMinor: 0, versionPatch: 0 },
              },
            },
          },
          {
            where: { name: 'kinetic_notation' },
            create: {
              name: 'kinetic_notation',
              versions: {
                create: [
                  { versionMajor: 1, versionMinor: 0, versionPatch: 1 },
                  {
                    versionMajor: 0,
                    versionMinor: 1,
                    versionPatch: 0,
                  },
                ],
              },
            },
          },
        ],
      },
    },
  });

  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
