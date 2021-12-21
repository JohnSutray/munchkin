import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardStackComponent } from './card-stack.component';
import { CardModule } from 'apps/munchkin/src/app/card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    CardStackComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    DragDropModule,
  ],
  exports: [
    CardStackComponent,
  ],
})
export class CardStackModule { }
