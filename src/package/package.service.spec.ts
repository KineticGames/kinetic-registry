import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PackageService } from './package.service';

describe('PackageService', () => {
  let service: PackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<PackageService>(PackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
