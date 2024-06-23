import { AuthService } from './auth.service';
import { LoginUserDTO, SignupUserDTO } from './dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() dto: LoginUserDTO): Promise<string> {
    return await this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: SignupUserDTO): Promise<string> {
    return await this.authService.register(dto);
  }
}
