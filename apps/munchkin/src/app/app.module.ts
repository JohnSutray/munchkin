import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import { MyDeckModule } from 'apps/munchkin/src/app/my-deck/my-deck.module';
import { OpponentWorkspaceModule } from 'apps/munchkin/src/app/opponent-workspace/opponent-workspace.module';
import { CardPacksModule } from 'apps/munchkin/src/app/card-packs/card-packs.module';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';
import { EquipmentItemModule } from 'apps/munchkin/src/app/equipment/equipment-item/equipment-item.module';
import { EquipmentModule } from 'apps/munchkin/src/app/equipment/equipment.module';
import { BattleBoardModule } from 'apps/munchkin/src/app/battle-board/battle-board.module';
import { BoolPipe } from 'apps/munchkin/src/app/pipes/bool.pipe';
import { ApproveReadyStateModule } from './approve-ready-state/approve-ready-state.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusBarModule } from './status-bar/status-bar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot({
      url: 'http://localhost:3333',
    }),
    EventPluginsModule,

    MyDeckModule,
    OpponentWorkspaceModule,
    CardPacksModule,
    EquipmentItemModule,
    EquipmentModule,
    BattleBoardModule,
    ApproveReadyStateModule,
    BrowserAnimationsModule,
    StatusBarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
