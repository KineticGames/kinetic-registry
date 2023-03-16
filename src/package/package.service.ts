import { Injectable } from '@nestjs/common';
import { Package, PackageVersion, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async package(
    packageWhereUniqueInput: Prisma.PackageWhereUniqueInput,
  ): Promise<Package | null> {
    return this.prisma.package.findUnique({
      where: packageWhereUniqueInput,
    });
  }

  async packages(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PackageWhereUniqueInput;
    where?: Prisma.PackageWhereInput;
    orderBy?: Prisma.PackageOrderByWithRelationInput;
  }): Promise<Package[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.package.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPackage(data: Prisma.PackageCreateInput): Promise<Package> {
    return this.prisma.package.create({ data });
  }

  async updateUser(params: {
    where: Prisma.PackageWhereUniqueInput;
    data: Prisma.PackageUpdateInput;
  }): Promise<Package> {
    const { where, data } = params;
    return this.prisma.package.update({
      data,
      where,
    });
  }

  async releasePackageVersion(
    pkg: Prisma.PackageWhereUniqueInput,
    data: Pick<
      Prisma.PackageVersionCreateInput,
      'versionMajor' | 'versionPatch' | 'versionMinor'
    >,
  ): Promise<PackageVersion> {
    const { versionMajor, versionMinor, versionPatch } = data;
    return this.prisma.packageVersion.create({
      data: {
        versionMajor,
        versionMinor,
        versionPatch,
        packageName: pkg.name,
      },
    });
  }

  async makePackageObsolete(
    where: Prisma.PackageWhereUniqueInput,
  ): Promise<Package> {
    return this.prisma.package.update({
      where,
      data: {
        obsolete: true,
      },
    });
  }
}
