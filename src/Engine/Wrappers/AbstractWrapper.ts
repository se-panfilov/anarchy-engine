import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Entity } from '@Engine/Models/Entity';

export abstract class AbstractWrapper<T> implements Entity {
  public id: string = nanoid();
  public abstract entity: T;
  public destroyed$ = new Subject<void>();

  protected constructor() {
    this.destroyed$.subscribe(() => {
      this.entity = undefined as any;
    });
  }

  public destroy() {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
    this.destroyed$.complete();
    this.entity = undefined as any;
  }
}
