import { Injectable } from '@nestjs/common';
import { Comment, Post, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  public createPost(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: {
        ...createPostInput,
        authorId: createPostInput.authorId,
      },
    });
  }

  async findOne(id: string): Promise<Post> {
    return await this.prisma.post.findFirst({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
  }

  async update(id: string, updatePostInput: UpdatePostInput) {
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        ...updatePostInput,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }

  async forAuthor(userEmail: string): Promise<Post[]> {
    return await this.prisma.user
      .findFirst({
        where: {
          email: userEmail,
        },
      })
      .posts({
        include: {
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
  }

  async getPosts(options?: any): Promise<Post[]> {
    return await this.prisma.post.findMany({
      ...options,
    });
  }

  async togglePostLike(userId: string, postId: string): Promise<Post> {
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getPostLikes(postId: string): Promise<User[]> {
    return await this.prisma.post
      .findFirst({
        where: {
          id: postId,
        },
      })
      .likes();
  }

  async getPostComments(postId: string, options?: any): Promise<Comment[]> {
    return await this.prisma.post
      .findFirst({
        where: {
          id: postId,
        },
        ...options,
      })
      .comments({
        include: {
          replies: true,
        },
      });
  }
}
