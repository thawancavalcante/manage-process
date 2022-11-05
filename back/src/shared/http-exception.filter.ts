
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const response = exception.getResponse()

        res
            .status(status)
            .json({
                ...(typeof response === 'string' ? { message: response } : { data: response }),
                // TODO: Dados para enviar para algum sistema de observability
                // statusCode: status,
                // timestamp: new Date().toISOString(),
                // path: req.url,
            });
    }
}