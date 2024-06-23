import { PostDTO } from './dto';
import { PostService } from './post.service';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('create')
  create(@Body() dto: PostDTO): Promise<string> {
    return this.postService.create(dto);
  }
  @Get('all')
  getAll(): Promise<PostDTO[]> {
    return this.postService.getAll();
  }
  @Get('published')
  getAllPublished(): Promise<PostDTO[]> {
    return this.postService.getAllPublished();
  }
  @Get('drafts')
  getAllDrafts(): Promise<PostDTO[]> {
    return this.postService.getAllDrafts();
  }
  @Post('update')
  update(@Body() dto: PostDTO): Promise<string> {
    return this.postService.update(dto);
  }
  @Delete('delete')
  delete(@Body() post: { id: string }): Promise<string> {
    return this.postService.delete(post);
  }
  @Delete('delete-many')
  deleteMany(@Body() post: { ids: string[] }): Promise<string> {
    return this.postService.deleteMany(post);
  }
}
