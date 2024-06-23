import { PostDTO } from './dto';
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  // create post
  async create({
    title,
    assets,
    content,
    authorId,
    published,
  }: PostDTO): Promise<string> {
    try {
      console.log('post', {
        title,
        assets,
        content,
        authorId,
        published,
      });
      await this.prisma.post.create({
        data: {
          title,
          assets,
          content,
          published,
          Author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
      return 'Post created successfully';
    } catch (error) {
      throw new HttpException('Something went wrong', 500);
    }
  }
  // update post
  async update({
    id,
    title,
    assets,
    content,
    published,
  }: PostDTO): Promise<string> {
    try {
      await this.prisma.post.update({
        where: { id },
        data: {
          title,
          assets,
          content,
          published,
        },
      });
      return 'Post updated successfully';
    } catch (error) {
      throw new HttpException('Something went wrong', 500);
    }
  }
  // delete post
  async delete(post: { id: string }): Promise<string> {
    try {
      await this.prisma.post.delete({
        where: { id: post.id },
      });
      return 'Post deleted successfully';
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }
  // delete multiple posts
  async deleteMany(post: { ids: string[] }): Promise<string> {
    try {
      await this.prisma.post.deleteMany({
        where: {
          id: {
            in: post.ids,
          },
        },
      });
      return 'Posts deleted successfully';
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }
  // get all posts
  async getAll(): Promise<PostDTO[]> {
    try {
      const posts = await this.prisma.post.findMany();
      return posts;
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }
  // get all published posts
  async getAllPublished(): Promise<PostDTO[]> {
    try {
      const posts = await this.prisma.post.findMany({
        where: { published: true },
      });
      return posts;
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }
  // get all draft posts
  async getAllDrafts(): Promise<PostDTO[]> {
    try {
      const posts = await this.prisma.post.findMany({
        where: { published: false },
      });
      return posts;
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }
}
