import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Comment entity' })
@Directive('@key(fields: "id")')
export class Comment {
  @Field({ nullable: false })
  id: string;

  authorId: string;

  postId?: string;

  content: string;

  @Field(() => [Comment], { nullable: true })
  replies?: Comment[];
}
