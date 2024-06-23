import * as argon2 from 'argon2';
import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserDTO, SignupUserDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login({ email, password }: LoginUserDTO): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      const isAuthorized = await argon2.verify(user.hashPassword, password);
      if (!isAuthorized) {
        throw new Error('Unauthorized user.');
      }
      return 'User logged in successfully';
    } catch (error) {
      throw new HttpException(`Unauthorized user: ${error}`, 401);
    }
  }
  async register({
    email,
    password,
    username,
  }: SignupUserDTO): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      throw new HttpException('User already exists.', 409);
    }
    try {
      const hashPassword = await argon2.hash(password);
      await this.prisma.user.create({
        data: { email, hashPassword, username },
      });
      return 'User signed up successfully';
    } catch (error) {
      throw new HttpException(`Something went wrong: ${error}`, 500);
    }
  }
}
