import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  user: IAuthUser;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  login(name: string, password: string) {
    this.authService
      .login({ name, password })
      .subscribe(res => {
        if (res) {
          this.user = this.authService.getUser();
        }
      });
  }

}
