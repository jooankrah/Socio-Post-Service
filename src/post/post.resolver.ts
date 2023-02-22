import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // Queries
  @Query(() => [Post], { name: 'post' })
  getPosts(@Args('options') options: string) {
    return this.postService.getPosts(options);
  }

  @Query(() => Post, { name: 'getPostById' })
  findOne(@Args('id') id: string) {
    return this.postService.findOne(id);
  }

  // Mutations
  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.createPost(createPostInput);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post, { name: 'deletePost' })
  removePost(@Args('id') id: string) {
    return this.postService.remove(id);
  }

  @Mutation(() => Post)
  // todo: get user ID from Authenticated User
  likePost(@Args('postId') postId: string, @Args('userId') userId: string) {
    return this.postService.togglePostLike(userId, postId);
  }

  // Field Resolvers
  @ResolveField(() => [User])
  likes(@Parent() post: Post) {
    return this.postService.getPostLikes(post.id);
  }

  @ResolveField(() => [Comment])
  comments(@Parent() post: Post) {
    return this.postService.getPostComments(post.id);
  }

  @ResolveField(() => User)
  author(@Parent() post: Post) {
    return { __typename: 'User', id: post.authorId };
  }
}
