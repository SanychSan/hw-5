import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailService } from './../../mail.service';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styles: [
    `
      .btn-group { margin-bottom: 20px }
    `
  ]
})
export class MailDetailComponent implements OnInit, OnDestroy {

  mail: IMail;
  mailId: string;

  paramsSubscribe;

  constructor(
    private mailService: MailService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.paramsSubscribe = this.route.params
      .pluck('mailId')
      .switchMap(mailId => this.mailService.getMail(<string>mailId))
      .subscribe(mail => this.mail = mail);
  }

  goToMails() {
    this.router.navigate(['/mails']);
  }

  ngOnDestroy() {
    this.paramsSubscribe.unsubscribe();
  }

}
