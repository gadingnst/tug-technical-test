import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { auth } from '@/modules/auth/auth.provider';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    
    // Pass headers down to better-auth
    const headers = new Headers();
    Object.entries(request.headers).forEach(([key, value]) => {
      if (typeof value === 'string') headers.append(key, value);
      else if (Array.isArray(value)) value.forEach(v => headers.append(key, v));
    });

    const sessionInfo = await auth.api.getSession({
      headers: headers,
    });

    if (!sessionInfo || !sessionInfo.session || !sessionInfo.user) {
      throw new UnauthorizedException('Invalid or missing authentication token');
    }

     
    const sessionData = sessionInfo as unknown as { user: { role: string; id: string }; session: unknown };
    const user = sessionData.user;
    const session = sessionData.session;

    // Admin validation logic: either has role='admin', or is in admins table
    let isAdmin = user.role === 'admin';

    if (!isAdmin) {
      isAdmin = await this.authService.validateAdmin(user.id);
    }

    if (!isAdmin) {
      throw new UnauthorizedException('User is not an admin');
    }

    // Attach user and session to request for downstream usage
    const req = request as Request & { user?: unknown; session?: unknown };
    req.user = user;
    req.session = session;

    return true;
  }
}
