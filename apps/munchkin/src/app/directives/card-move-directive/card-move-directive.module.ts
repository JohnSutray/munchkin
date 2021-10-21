import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMoveDirective } from './card-move.directive';


@NgModule({
  declarations: [
    CardMoveDirective,
  ],
  exports: [
    CardMoveDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class CardMoveDirectiveModule { }
