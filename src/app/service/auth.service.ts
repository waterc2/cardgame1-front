import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService implements CanActivate {
  public baseUrl = 'http://127.0.0.1';
  private loggedUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;
  currentUserValue: any;

  constructor(private httpClient: HttpClient, public router: Router) {
    let returnUrl = localStorage.getItem('loggedInUser');
    if (returnUrl) {
      const getLoggedUser = JSON.parse(returnUrl);
      this.loggedUserSubject = new BehaviorSubject(this.loginUser);
      this.loggedInUser = this.loggedUserSubject.asObservable();
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let returnUrl = localStorage.getItem('loggedInUser');
    if (returnUrl && JSON.parse(returnUrl).user.u_id) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  loginUser(emailAddress: string, password: string) {
    let apiArray = { email: emailAddress, password: password };
    return this.httpClient
      .post<any>(`${this.baseUrl}/api/auth/login`, apiArray)
      .pipe(
        map((response) => {
          localStorage.setItem('loggedInUser', JSON.stringify(response));
          //this.loggedUserSubject.next(response);
          return response;
        })
      );
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    //this.loggedUserSubject.next(null);
  }

  public get loggedInUserValue() {
    let returnUrl = localStorage.getItem('loggedInUser');
    if (returnUrl && JSON.parse(returnUrl).user.u_id) {
      return JSON.parse(returnUrl);
    }
  }
}
