import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PackageService } from './package.service';
import {
  Package as PackageModel,
  PackageVersion as PackageVersionModel,
} from '@prisma/client';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) { }

  @Get(':name')
  async getPostById(@Param('name') name: string): Promise<PackageModel> {
    return this.packageService.package({ name: name });
  }

  @Get('most_recent')
  async getMostRecentPackage(): Promise<PackageModel[]> {
    return this.packageService.packages({
      take: 10,
      orderBy: {
        updatedAt: 'asc',
      },
    });
  }

  @Post('/')
  async createPackage(
    @Body()
    packageData: {
      name: string;
      description?: string;
      authorEmail: string;
    },
  ): Promise<PackageModel> {
    const { name, description, authorEmail } = packageData;

    return this.packageService.createPackage({
      name,
      description,
      owners: {
        connect: { email: authorEmail },
      },
    });
  }

  @Get('filtered/:searchString')
  async getFilteredPackages(
    @Param('searchString') searchString: string,
  ): Promise<PackageModel[]> {
    return this.packageService.packages({
      take: 50,
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
        ],
      },
    });
  }

  @Put(':name/release')
  async releasePackageVersion(
    @Param('name') name: string,
    @Body()
    versionData: {
      versionMajor: number;
      versionMinor: number;
      versionPatch: number;
    },
  ): Promise<PackageVersionModel> {
    return this.packageService.releasePackageVersion({ name }, versionData);
  }

  @Delete(':name')
  async makePackageObsolete(
    @Param('name') name: string,
  ): Promise<PackageModel> {
    return this.packageService.makePackageObsolete({ name });
  }
}
