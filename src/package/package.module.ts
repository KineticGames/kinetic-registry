import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';

@Module({
  imports: [PrismaModule],
  providers: [PackageService],
  controllers: [PackageController],
  exports: [PackageService],
})
export class PackageModule {}
