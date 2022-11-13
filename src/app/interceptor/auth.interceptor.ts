import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, public router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.loggedInUserValue) {
      const token = this.authService.loggedInUserValue.access_token;
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
      }
    }

    return next.handle(request).pipe(
      tap(
        () => {
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return next.handle(request);
            }            
            if (err.status !== 401) {
              return next.handle(request);
            }            
            if (err.status !== 401) {
              return next.handle(request);
            }
            this.router.navigate(['login']);
          }
          return next.handle(request);
        }
      )
    );
  }
}
