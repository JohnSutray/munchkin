import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPacksComponent } from './card-packs.component';
import { CardModule } from 'apps/munchkin/src/app/card/card.module';
import { CardStackModule } from 'apps/munchkin/src/app/card-stack/card-stack.module';



@NgModule({
  declarations: [
    CardPacksComponent,
  ],
  exports: [
    CardPacksComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    CardStackModule,
  ],
})
export class CardPacksModule { }
