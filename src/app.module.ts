import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';

import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

import { AssetModule } from './upload/asset.module';
import { AssetService } from './upload/asset.service';

@Module({
  imports: [AuthModule, PrismaModule, PostModule, AssetModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, PostService, AssetService],
})
export class AppModule {}
