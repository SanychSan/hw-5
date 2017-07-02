import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[appMailCard]',
  templateUrl: './mail-card.component.html'
})
export class MailCardComponent implements OnInit {

  @Input() mail: IMail;
  @Input() index: number;

  @Output() onremove = new EventEmitter<IMail>();

  createdAt: number;

  constructor() { }

  ngOnInit() {
    this.createdAt = Date.now();
  }

  remove(): void {
    console.log(`time life of component ${(Date.now() - this.createdAt) / 1000} seconds`);
    this.onremove.emit(this.mail);
  }

}
