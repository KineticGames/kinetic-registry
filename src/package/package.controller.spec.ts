import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PackageController } from './package.controller';

describe('PackageController', () => {
  let controller: PackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageController],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<PackageController>(PackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
