import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentItemComponent } from 'apps/munchkin/src/app/equipment/equipment-item/equipment-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModule } from 'apps/munchkin/src/app/card/card.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EquipmentItemComponent,
  ],
  exports: [
    EquipmentItemComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CardModule,
    PipesModule,
  ],
})
export class EquipmentItemModule {
}
