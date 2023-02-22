import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  title?: string;
  content: string;
  authorId?: string;
  topicId: string;
}
