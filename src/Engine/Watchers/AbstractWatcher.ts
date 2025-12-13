import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';

interface Watcher {
  readonly id: string;
  readonly start: () => void;
  readonly stop: () => void;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}

export abstract class AbstractWatcher implements Watcher {
  public id: string = nanoid();
  public destroyed$ = new Subject<void>();

  public abstract start(): void;
  public abstract stop(): void;

  public destroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
    this.destroyed$.complete();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,functional/immutable-data
    this.id = undefined as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,functional/immutable-data
    this.destroyed$ = undefined as any;
  }
}
