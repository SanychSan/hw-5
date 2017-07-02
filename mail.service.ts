import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/interval';

@Injectable()
export class MailService {

  mails: IMail[] = [
    {
      id: '1',
      from: 'from',
      to: 'to',
      title: 'title',
      content: 'content',
      createdAt: new Date('2017-06-11T16:13:54.000Z')
    },
    {
      id: '2',
      from: 'from',
      to: 'to',
      title: 'title',
      content: 'content',
      createdAt: new Date('2017-07-01T10:59:54.000Z')
    }
  ];

  constructor() { }

  getMails(): Observable<IMail[]> {
    return Observable.of(this.mails);
  }

  getMail(id: string): Observable<IMail> {
    return this
      .getMails()
      .switchMap(res => res)
      .filter(res => res.id === id);
  }

  removeMail(mail: IMail): void {
    const mailIndex = this.mails.indexOf(mail);
    if (mailIndex > -1) {
      this.mails.splice(mailIndex, 1);
    }
  }

}
