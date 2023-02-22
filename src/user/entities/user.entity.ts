import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field()
  @Directive('@external')
  id: string;

  @Field(() => [Post])
  posts?: Post[];
}
