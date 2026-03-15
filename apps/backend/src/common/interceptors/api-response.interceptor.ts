import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@wellness/shared-typescript';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: unknown) => {
        // If the data already has the standardized structure, return it as is
        if (data && typeof data === 'object' && 'success' in data && 'payload' in data) {
          return data as unknown as ApiResponse<T>;
        }

        const resObj = (data && typeof data === 'object') ? (data as Record<string, unknown>) : null;

        return {
          success: true,
          message: (resObj && typeof resObj.message === 'string') ? resObj.message : 'Request successful',
          payload: (resObj && resObj.payload !== undefined && resObj.payload !== null) 
            ? resObj.payload 
            : (data !== undefined && data !== null && typeof data === 'object' && !('message' in data) ? data : {}),
          errors: [],
        } as unknown as ApiResponse<T>;
      }),
    );
  }
}
