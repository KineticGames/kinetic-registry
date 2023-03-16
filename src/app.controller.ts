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
import { UserService } from './user.service';
import {
  User as UserModel,
  Package as PackageModel,
  PackageVersion as PackageVersionModel,
} from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly packageService: PackageService,
  ) {}

  @Get('package/:name')
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

  @Get('filtered-packages/:searchString')
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

  @Post('package')
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

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('release/:name')
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

  @Delete('package/:name')
  async makePackageObsolete(
    @Param('name') name: string,
  ): Promise<PackageModel> {
    return this.packageService.makePackageObsolete({ name });
  }
}
