import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDeckComponent } from './my-deck.component';
import { CardModule } from 'apps/munchkin/src/app/card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardMoveDirectiveModule } from 'apps/munchkin/src/app/directives/card-move-directive/card-move-directive.module';



@NgModule({
  declarations: [
    MyDeckComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    DragDropModule,
    CardMoveDirectiveModule,
  ],
  exports: [
    MyDeckComponent,
  ],
})
export class MyDeckModule { }
