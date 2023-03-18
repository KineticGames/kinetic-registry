import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PackageModule } from './package/package.module';

@Module({
  imports: [UserModule, PackageModule],
})
export class AppModule {}
