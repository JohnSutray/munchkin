import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import { MyDeckModule } from 'apps/munchkin/src/app/my-deck/my-deck.module';
import { CardMoveOverlayModule } from 'apps/munchkin/src/app/card-move-overlay/card-move-overlay.module';
import { OpponentWorkspaceModule } from 'apps/munchkin/src/app/opponent-workspace/opponent-workspace.module';
import { CardPacksModule } from 'apps/munchkin/src/app/card-packs/card-packs.module';
import { EventPluginsModule } from '@tinkoff/ng-event-plugins';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot({
      url: 'http://localhost:3333',
    }),
    EventPluginsModule,

    MyDeckModule,
    CardMoveOverlayModule,
    OpponentWorkspaceModule,
    CardPacksModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
