import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  actionEventName,
  ActionMessage,
  gameUpdate,
  joinGameEventName,
  JoinGameMessage,
  resetTestGameStateEventName,
  startGameAction,
} from 'libs/api-interfaces/src/lib/actions';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { Socket } from 'ngx-socket-io';
import { DndLinksService } from 'apps/munchkin/src/app/services/dnd-links.service';
import { CardMoveOverlayService } from 'apps/munchkin/src/app/services/card-move-overlay.service';
import { doorsId, myDeckId } from 'apps/munchkin/src/app/constants/workspace.constants';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { MyDeckService } from 'apps/munchkin/src/app/services/my-deck.service';

@Component({
  selector: 'munchkin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DndLinksService,
    CardMoveOverlayService,
    CardPlaceholderService,
    MyDeckService,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly socket: Socket,
    private readonly cardMoveOverlayService: CardMoveOverlayService,
    private readonly cardPlaceholderService: CardPlaceholderService,
    private readonly myDeckService: MyDeckService,
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.cardPlaceholderService.setPlaceholderCard('5')
      this.cardMoveOverlayService.startCardMoving({
        cardId: '5',
        from: doorsId,
        to: ''
      });
    });
    setTimeout(() => {
      this.myDeckService.setCards(['1', '2', '3', '4', '5', '6']);
    }, 2000)
  }

  ngOnInit(): void {
    this.socket.fromEvent('connect_error').subscribe(console.error);
    this.socket.fromEvent(gameUpdate).subscribe(console.log);

    this.socket.fromEvent('connect').subscribe(() => {
      // this.socket.emit(joinGameEventName, { gameId: '1' } as JoinGameMessage);
      // this.socket.emit(actionEventName, {
      //   gameId: '1',
      //   action: createAction(startGameAction),
      // } as ActionMessage);
    });
  }

  resetGameState(): void {
    this.socket.emit(resetTestGameStateEventName);
  }
}
