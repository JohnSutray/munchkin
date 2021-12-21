import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleBoardComponent } from './battle-board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModule } from 'apps/munchkin/src/app/card/card.module';
import { PipesModule } from 'apps/munchkin/src/app/pipes/pipes.module';
import { AvatarModule } from '../avatar/avatar.module';
import { VersusModule } from '../versus/versus.module';


@NgModule({
  declarations: [
    BattleBoardComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    CardModule,
    PipesModule,
    AvatarModule,
    VersusModule,
  ],
  exports: [
    BattleBoardComponent,
  ],
})
export class BattleBoardModule {
}
