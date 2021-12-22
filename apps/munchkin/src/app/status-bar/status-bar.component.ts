import { Component } from '@angular/core';
import { GameIterationService } from '../services/game-iteration.service';
import { filter, map, mapTo, share, switchMap, takeUntil } from 'rxjs/operators';
import { interval, merge, Observable, of, timer } from 'rxjs';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';

const PROGRESS_TICK_INTERVAL = 100;

const secondsToMilliseconds = (seconds: number) => seconds * 1000;

interface CurrentProgress {
  readonly timeLeftInSeconds: number;
  readonly timeLeftInPercents: number;
}

@Component({
  selector: 'munchkin-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent {
  readonly stagingTime = secondsToMilliseconds(this.gameIterationService.game.stagingTimeSeconds);
  readonly battleTime = secondsToMilliseconds(this.gameIterationService.game.battleTimeSeconds);

  readonly progress$: Observable<CurrentProgress> = merge(
    this.gameIterationService.updatesOfType$(GameActions.startStagingAction).pipe(mapTo(this.stagingTime)),
    this.gameIterationService.updatesOfType$(GameActions.startBattleAction).pipe(mapTo(this.battleTime)),
    this.gameIterationService.updatesOfType$(GameActions.setStagingGameStateAction).pipe(
      filter(game => !game.staging),
      mapTo(null),
    ),
  ).pipe<CurrentProgress>(switchMap(this.startCountDown.bind(this)));

  constructor(
    private readonly gameIterationService: GameIterationService,
  ) {
  }

  private startCountDown(totalTimeInMilliseconds: number): Observable<CurrentProgress> {
    if (!totalTimeInMilliseconds) {
      return of(null);
    }

    return interval(PROGRESS_TICK_INTERVAL).pipe(
      takeUntil(timer(totalTimeInMilliseconds + PROGRESS_TICK_INTERVAL + 1)),
      map(this.timeToProgress(totalTimeInMilliseconds)),
      share(),
    );
  }

  private timeToProgress(totalTimeInMilliseconds: number) {
    return (ticksCount: number): CurrentProgress => {
      const passedTime = ticksCount * PROGRESS_TICK_INTERVAL;
      const percentagePassedTime = passedTime / totalTimeInMilliseconds * 100;

      return {
        timeLeftInPercents: 100 - percentagePassedTime,
        timeLeftInSeconds: Math.ceil((totalTimeInMilliseconds - passedTime) / 1000),
      };
    };
  }
}
