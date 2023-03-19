import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { HttpException } from '@nestjs/common';

describe('PackageController', () => {
  let packageController: PackageController;
  let packageService: DeepMocked<PackageService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageController],
    })
      .useMocker(createMock)
      .compile();

    packageController = module.get<PackageController>(PackageController);
    packageService = module.get(PackageService);
  });

  it('should be defined', () => {
    expect(packageController).toBeDefined();
  });

  describe('getPackageById', () => {
    it('should throw Not Found when a package is not found', async () => {
      packageService.package.mockResolvedValueOnce(null);

      const getPackage = packageController.getPackageById('test_string');
      await expect(getPackage).rejects.toThrow(HttpException);
    });

    it('should return the requested package when a valid name is supplied', async () => {
      packageService.package.mockImplementation(async (args) => {
        return {
          name: args.name,
          description: null,
          obsolete: false,
          url: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      const getPackage = packageController.getPackageById('test_string');
      await expect(getPackage).resolves.toHaveProperty('name', 'test_string');
    });
  });
});
