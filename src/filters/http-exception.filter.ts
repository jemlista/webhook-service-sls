import { Request, Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly _logger = new Logger('HttpExceptionsFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();

    this._logger.error(
      'HttpException',
      JSON.stringify({
        exception: exception,
        request: {
          method: request.method,
          url: request.url,
          params: request.params,
          body: request.body,
          query: request.query,
        },
      }),
    );

    return response.status(status).json(exception.getResponse());
  }
}
