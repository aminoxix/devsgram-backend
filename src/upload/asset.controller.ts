import { AssetDTO } from './dto/asset.dto';
import { AssetService } from './asset.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}
  @Post('upload')
  upload(@Body() dto: AssetDTO): Promise<string> {
    return this.assetService.upload(dto);
  }
}
