import { IsNotEmpty } from 'class-validator';

export class AssetDTO {
  @IsNotEmpty()
  fileName: string;
}
