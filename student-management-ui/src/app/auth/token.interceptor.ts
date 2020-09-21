import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from '../modals/user.modal';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (!user) {
          return next.handle(request);
        } else {
          const modifiedRequest = request.clone({
            headers: new HttpHeaders().append('Authorization', user.token),
          });
          return next.handle(modifiedRequest);
        }
      })
    );
  }
}
