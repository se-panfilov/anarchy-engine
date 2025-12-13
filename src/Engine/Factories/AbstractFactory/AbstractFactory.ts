import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { IFactory, IReactiveWrapper } from '@Engine/Models';
import type { IAbstractConfig } from '@Engine/Launcher/Models';
import { isNotDefined } from '@Engine/Utils';
import type { ICreateFN } from '@Engine/Factories/AbstractFactory/Models';

export function AbstractFactory<T extends IReactiveWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig>(
  type: string,
  create: ICreateFN<T, PRMS>,
  adapterFn?: (config: C) => PRMS
): IFactory<T, ENT, PRMS, C> {
  const id: string = type + '_factory_' + nanoid();
  const latest$: Subject<T> = new Subject<T>();
  const create$: Subject<PRMS> = new Subject<PRMS>();
  const createFromConfig$: Subject<C> = new Subject<C>();
  const destroy$: Subject<void> = new Subject<void>();

  create$.subscribe((params: PRMS): void => latest$.next(create(params)));

  createFromConfig$.subscribe((config: C): void => {
    if (isNotDefined(adapterFn))
      throw new Error(`Factory "${id}" cannot create from config: adapter function is not provided`);
    create$.next(adapterFn(config));
  });

  destroy$.subscribe(() => {
    create$.unsubscribe();
    create$.complete();
    createFromConfig$.unsubscribe();
    createFromConfig$.complete();
    latest$.complete();
    destroy$.complete();
  });

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type + '_factory';
    },
    get latest$(): Subject<T> {
      return latest$;
    },
    get create$(): Subject<PRMS> {
      return create$;
    },
    get createFromConfig$(): Subject<C> {
      return createFromConfig$;
    },
    get destroy$(): Subject<void> {
      return destroy$;
    }
  };
}
