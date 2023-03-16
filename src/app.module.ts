import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, PackageModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
