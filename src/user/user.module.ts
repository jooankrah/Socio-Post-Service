import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [PostModule],
  providers: [UserResolver],
  exports: [],
})
export class UserModule {}
