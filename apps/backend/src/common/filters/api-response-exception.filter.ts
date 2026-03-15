import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ApiResponseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: (exception as Error).message || 'Internal server error' };

    let message = 'Internal server error';
    let errors: string[] = ['Internal server error'];

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
      errors = [exceptionResponse];
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resObj = exceptionResponse as { message?: unknown };
      if (Array.isArray(resObj.message)) {
        const stringMessages = resObj.message.filter((m): m is string => typeof m === 'string');
        if (stringMessages.length > 0) {
          message = stringMessages[0];
          errors = stringMessages;
        }
      } else if (typeof resObj.message === 'string') {
        message = resObj.message;
        errors = [resObj.message];
      }
    }

    response.status(status).json({
      success: false,
      message,
      payload: {},
      errors,
    });
  }
}
