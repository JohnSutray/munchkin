import { Module } from '@nestjs/common';
import { AppGateway } from 'apps/api/src/app/app.gateway';
import { GameService } from 'apps/api/src/app/services/game.service';

@Module({
  providers: [
    AppGateway,
    GameService,
  ],
})
export class AppModule {
}
