import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatecommentInput {
  authorId: string;
  postId?: string;
  content: string;
}
