import { UsersService } from './../../users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
    `
      img {
        width: 100%;
        height: auto;
      }
      .placeholder {
        padding-top: 100%;
        background: #ccc;
        position: relative;
      }
      h3 { margin: 0 }
    `
  ]
})
export class UserDetailComponent implements OnInit, OnDestroy {

  user: IUser;
  userId: string;

  paramsSubscribe;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSubscribe = this.route.params
      .pluck('userId')
      .switchMap(userId => this.usersService.getUser(<string>userId))
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.paramsSubscribe.unsubscribe();
  }

}
