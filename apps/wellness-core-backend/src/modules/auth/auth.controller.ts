import {
  Controller,
  Post,
  Body,
  HttpCode,
  InternalServerErrorException,
  Headers,
} from '@nestjs/common';
import { auth } from '@/modules/auth/auth.provider';
import { AuthService } from './auth.service';
import { LoginSchema, ChangePasswordSchema } from '@wellness/shared-typescript';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  @Post('change-password')
  @HttpCode(200)
  async changePassword(
    @Body() body: unknown,
    @Headers('authorization') authHeader: string,
  ) {
    const parsed = ChangePasswordSchema.safeParse(body);
    if (!parsed.success) {
      throw new InternalServerErrorException(parsed.error.flatten());
    }

    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      throw new InternalServerErrorException('No authorization token provided');
    }

    const { currentPassword, newPassword } = parsed.data;

    const res = await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        authorization: `Bearer ${token}`
      } as any,
      asResponse: true,
    });

    if (res.status !== 200) {
      const errorText = await res.text();
      throw new InternalServerErrorException(`Change password failed: ${errorText}`);
    }

    return {
      message: 'Password changed successfully',
    };
  }
}
