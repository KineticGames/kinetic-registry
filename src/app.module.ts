import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PackageService } from './package.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [PrismaService, UserService, PackageService],
})
export class AppModule { }
