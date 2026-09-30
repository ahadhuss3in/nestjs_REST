import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { PostsModule } from './posts/posts.module.js';

@Module({
  imports: [UserModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
