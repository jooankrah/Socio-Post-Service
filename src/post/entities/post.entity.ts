import { ObjectType, Field, Directive } from '@nestjs/graphql';
import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType({ description: 'Post Model' })
@Directive('@key(fields: "id")')
export class Post {
  id: string;

  title?: string;

  content: string;

  authorId: string;

  @Field(() => User)
  author: User;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @Field(() => [User], { nullable: true })
  likes: User[];
}
