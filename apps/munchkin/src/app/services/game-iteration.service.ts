import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class GameIterationService {
  constructor(
    private readonly socket: Socket,
  ) {
  }

  
}
