import { MailService } from './../mail.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styles: [
    `
      :host >>> .table>tbody>tr>td {
        vertical-align: middle;
      }
      :host >>> .show-on-hover {
        visibility: hidden;
      }
      :host >>> .table tr:hover .show-on-hover {
        visibility: visible;
      }
    `
  ]
})
export class MailBoxComponent implements OnInit {

  mails$: Observable<IMail[]>;

  constructor(
    private mailService: MailService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mails$ = this.mailService.getMails();
  }

  removeMail(mail: IMail): void {
    this.mailService.removeMail(mail);
  }

  goToMail(mailId: string): void {
    this.router.navigate(['/mails', mailId]);
  }

}
