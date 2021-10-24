import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModule } from 'apps/munchkin/src/app/card/card.module';



@NgModule({
  declarations: [
    EquipmentComponent,
  ],
  exports: [
    EquipmentComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CardModule,
  ],
})
export class EquipmentModule { }
