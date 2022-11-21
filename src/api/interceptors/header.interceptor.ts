/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotAcceptableException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const header = context.switchToHttp().getRequest().headers;

    if (header['accept'] === 'application/xml') {
      throw new NotAcceptableException({
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Given header not acceptable',
      });
    }

    return next.handle();
  }
}
