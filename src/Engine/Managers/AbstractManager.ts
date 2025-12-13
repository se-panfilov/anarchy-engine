import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '../Models/Manager';
import type { Entity } from '@Engine/Models/Entity';

export abstract class AbstractManager<T extends Entity> implements Manager<T> {
  public id: string = nanoid();
  public current$ = new BehaviorSubject<T | undefined>(undefined);
  public list$ = new BehaviorSubject<ReadonlyArray<T>>([]);
  public destroyed$ = new Subject<void>();

  public abstract create(...params: any): T;

  public setCurrent(actor: T): void {
    this.current$.next(actor);
  }

  public destroy() {
    this.current$.complete();
    this.list$.complete();
    this.destroyed$.next();
    this.destroyed$.complete();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, functional/immutable-data
    this.id = undefined as any;
    this.current$ = undefined as any;
    this.list$ = undefined as any;
    this.destroyed$ = undefined as any;
  }
}
