import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [PackageService],
  controllers: [PackageController],
  exports: [PackageService],
})
export class PackageModule {}
