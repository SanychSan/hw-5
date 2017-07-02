import { RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { MailCardComponent } from './mail-box/mail-card/mail-card.component';

import { MailService } from './mail.service';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { ElapsedPipe } from './mail-box/elapsed.pipe';
import { MailDetailComponent } from './mail-box/mail-detail/mail-detail.component';

import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';

const routs: Route[] = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'mails',
    component: MailBoxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mails/:mailId',
    component: MailDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:userId',
    component: UserDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserListComponent,
    UserCardComponent,
    UserDetailComponent,
    MailBoxComponent,
    MailCardComponent,
    ElapsedPipe,
    MailDetailComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    RouterModule.forRoot(routs)
  ],
  providers: [
    UsersService,
    MailService,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
