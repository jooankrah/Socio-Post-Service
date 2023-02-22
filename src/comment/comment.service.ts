import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatecommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createNewComment(createcommentInput: CreatecommentInput) {
    return await this.prisma.comment.create({
      data: {
        ...createcommentInput,
      },
    });
  }

  async getComment(commentId: string): Promise<Comment> {
    return await this.prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
  }

  async createCommentReply(
    commentId: string,
    createcommentInput: CreatecommentInput,
  ): Promise<Comment> {
    return await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        replies: {
          create: {
            ...createcommentInput,
          },
        },
      },
    });
  }

  async getreplies(commentId: string): Promise<Comment[]> {
    return await this.prisma.comment
      .findFirst({
        where: {
          id: commentId,
        },
      })
      .replies();
  }
}
