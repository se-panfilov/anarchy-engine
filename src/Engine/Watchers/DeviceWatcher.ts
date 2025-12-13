import { BehaviorSubject } from 'rxjs';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher';

interface ScreenParams {
  readonly width: number;
  readonly height: number;
  readonly ratio: number;
}

export class DeviceWatcher extends AbstractWatcher {
  public size$: BehaviorSubject<ScreenParams>;

  //w = 1, h = 1, r = 2
  constructor({ width, height, ratio }: ScreenParams) {
    super();
    this.size$ = new BehaviorSubject<ScreenParams>({ width, height, ratio });

    this.destroyed$.subscribe(() => {
      this.stop();
      this.size$.complete();
      this.size$ = undefined as any;
    });
  }

  // TODO (S.Panfilov) global?
  public onResize = (): void =>
    this.size$.next({ width: window.innerWidth, height: window.innerHeight, ratio: this.size$.value.ratio });

  // TODO (S.Panfilov) global?
  public start = (): void => window.addEventListener('resize', this.onResize);

  // TODO (S.Panfilov) global?
  public stop = (): void => window.removeEventListener('resize', this.onResize);
}
