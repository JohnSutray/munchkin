import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'munchkin-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @HostBinding('attr.id')
  @Input() cardId: string;

  @HostBinding('class.card-wrapper')
  private readonly cardWrapperClass = true;

  constructor() { }

  ngOnInit(): void {
  }

}
