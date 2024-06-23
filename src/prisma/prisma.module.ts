import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // use the @Global() decorator to make the PrismaService available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // need to export the PrismaService to use it in other modules
})
export class PrismaModule {}
