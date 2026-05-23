import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ShopsService],
  controllers: [ShopsController],
  imports: [PrismaModule, AuthModule]
})
export class ShopsModule {}
