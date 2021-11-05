import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './equipment.component';
import { EquipmentItemModule } from 'apps/munchkin/src/app/equipment/equipment-item/equipment-item.module';



@NgModule({
  declarations: [
    EquipmentComponent,
  ],
  exports: [
    EquipmentComponent,
  ],
  imports: [
    CommonModule,
    EquipmentItemModule,
  ],
})
export class EquipmentModule { }
