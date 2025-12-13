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

  public destroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
    this.destroyed$.complete();
    this.id = undefined as any;
    this.destroyed$ = undefined as any;
  }
}
