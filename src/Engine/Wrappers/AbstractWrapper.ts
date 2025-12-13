import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Entity } from '@Engine/Models/Entity';

export abstract class AbstractWrapper<T> implements Entity {
  public id: string = nanoid();
  public abstract entity: T;
  public destroyed$ = new Subject<void>();

  protected constructor() {
    this.destroyed$.subscribe(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.entity = undefined as any;
    });
  }

  public destroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
    this.destroyed$.complete();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,functional/immutable-data
    this.id = undefined as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,functional/immutable-data
    this.entity = undefined as any;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,functional/immutable-data
    this.destroyed$ = undefined as any;
  }
}
