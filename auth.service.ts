import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  private isLogin = false;
  private isLogin$ = new BehaviorSubject<boolean>(this.isLogin);

  private user: IAuthUser;

  constructor() { }

  getUser(): IAuthUser {
    return this.user;
  }

  isAuth(): Observable<boolean> {
    return Observable.from(this.isLogin$);
  }

  login(user: IAuthUser): Observable<boolean> {
    return Observable
      .of(this.user)
      .map(res => {
        if (user.name.trim() && user.password.trim()) {
          this.user = user;
          this.isLogin = true;
          this.isLogin$.next(this.isLogin);
        }

        return this.isLogin;
      });
  }

}
