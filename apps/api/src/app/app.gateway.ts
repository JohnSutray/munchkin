import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from 'apps/api/src/app/services/game.service';
import {
  actionEventName,
  ActionMessage,
  GameChange,
  gameUpdate,
  joinGameEventName,
  JoinGameMessage,
  resetTestGameStateEventName,
} from 'libs/api-interfaces/src/lib/actions';

@WebSocketGateway(3333)
export class AppGateway implements OnGatewayInit {
  @WebSocketServer()
  readonly server: Server;

  constructor(
    private readonly gameService: GameService,
  ) {
  }

  @SubscribeMessage(actionEventName)
  registerAction(
    @MessageBody() message: ActionMessage,
  ) {
    this.gameService.registerAction(message.gameId, message.action);
  }

  @SubscribeMessage(resetTestGameStateEventName)
  createGame() {
    this.gameService.resetTestGameState();
  }

  @SubscribeMessage(joinGameEventName)
  joinGame(
    @MessageBody() message: JoinGameMessage,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(message.gameId);
  }

  afterInit(): any {
    this.gameService.onGameChange$('1')
      .subscribe(this.emitGameChange);
  }

  private emitGameChange = (game: GameChange) => this.server
    .to(game.gameId)
    .emit(gameUpdate, game)
}
