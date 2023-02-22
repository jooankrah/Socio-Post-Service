import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { CommentService } from './comment.service';
import { CreatecommentInput } from './dto/create-comment.input';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  //   mutations
  @Mutation(() => Comment)
  createComment(
    // todo: get author id from Authorized User
    @Args('createcommentInput') createcommentInput: CreatecommentInput,
  ) {
    return this.commentService.createNewComment(createcommentInput);
  }

  @Mutation(() => Comment)
  createCommentReply(
    @Args('commentId') commentId: string,
    @Args('createcommentInput') createcommentInput: CreatecommentInput,
  ) {
    return this.commentService.createCommentReply(
      commentId,
      createcommentInput,
    );
  }

  // @ResolveField(() => [Comment])
  // replies(@Parent() comment: Comment) {
  //   return this.commentService.getreplies(comment.id);
  // }

  @ResolveReference()
  resolveReferences(reference: { __typename: string; id: string }) {
    return this.commentService.getComment(reference.id);
  }
}
