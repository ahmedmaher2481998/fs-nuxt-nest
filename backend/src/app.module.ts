import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PermitsModule } from './permits/permits.module';

@Module({
  imports: [PrismaModule, PermitsModule],
})
export class AppModule {}
