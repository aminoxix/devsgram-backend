import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostDTO {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsString()
  authorId: string;

  @IsArray()
  assets: string[];

  @IsBoolean()
  published: boolean;
}
