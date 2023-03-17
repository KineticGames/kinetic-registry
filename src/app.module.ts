import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, PackageModule],
})
export class AppModule {}
