import {
  Controller,
  Post,
  Body,
  HttpCode,
  InternalServerErrorException,
} from '@nestjs/common';
import { auth } from '@/modules/auth/auth.provider';
import { AuthService } from './auth.service';
import { LoginSchema } from '@wellness/shared-typescript';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: unknown) {
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      throw new InternalServerErrorException(parsed.error.flatten());
    }

    const { email, password } = parsed.data;

    const res = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    if (res.status !== 200) {
      const errorText = await res.text();
      throw new InternalServerErrorException(`Sign in failed: ${errorText}`);
    }

    const token = res.headers.get('set-auth-token');
    
    // As per our backend, the caller should read the actual session
    // Because better-auth handles set-cookie natively if we don't use bearer, but with bearer plugin, 
    // it returns the token in the 'set-auth-token' header
    
    return {
      message: 'Login successful',
      token,
    };
  }
}
