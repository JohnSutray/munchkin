import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMoveOverlayComponent } from './card-move-overlay.component';
import { CardModule } from 'apps/munchkin/src/app/card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    CardMoveOverlayComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    DragDropModule,
  ],
  exports: [
    CardMoveOverlayComponent,
  ],
})
export class CardMoveOverlayModule { }
