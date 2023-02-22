import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from '../post/entities/post.entity';
import { User } from './entities/user.entity';
import { PostService } from '../post/post.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private postsService: PostService) {}

  @ResolveField(() => [Post])
  public posts(@Parent() user: User) {
    return this.postsService.forAuthor(user.id);
  }
}
