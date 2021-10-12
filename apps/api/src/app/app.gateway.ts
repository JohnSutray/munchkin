import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ActionMessage } from 'libs/api-interfaces/src/lib/models';
import { Server } from 'socket.io';
import { GameService } from 'apps/api/src/app/services/game.service';
import { gameUpdate } from 'libs/api-interfaces/src/lib/constants/game-update';

@WebSocketGateway(3333)
export class AppGateway implements OnGatewayInit {
  @WebSocketServer()
  readonly server: Server;

  constructor(
    private readonly gameService: GameService,
  ) {
console.log('123')
  }

  @SubscribeMessage('action')
  registerAction(
    @MessageBody() message: ActionMessage,
  ) {
    this.gameService.registerAction(message.gameId, message.action);
  }

  afterInit(): any {
    this.gameService.onGameChange$('1')
      .subscribe(game => this.server.emit(gameUpdate, game));
  }
}
