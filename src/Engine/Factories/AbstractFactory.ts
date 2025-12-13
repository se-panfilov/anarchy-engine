import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { ReactiveWrapper, Factory } from '@Engine/Models';
import type { AbstractConfig } from '@Engine/Launcher/Models';
import { isNotDefined } from '@Engine/Utils';

export function AbstractFactory<T extends ReactiveWrapper<unknown>, PARAMS extends Record<string, any>>(
  // TODO (S.Panfilov) should be AbstractConfig instead of any, but doesn't work for some reason
  // type: string, create: (params: PARAMS) => T, adapterFn?: (config: AbstractConfig) => PARAMS
  type: string,
  create: (params: PARAMS) => T,
  adapterFn?: (config: any) => PARAMS
): Factory<T, PARAMS> {
  const id: string = type + '_' + nanoid();
  const latest$: Subject<T> = new Subject<T>();
  const create$: Subject<PARAMS> = new Subject<PARAMS>();
  const createFromConfig$: Subject<AbstractConfig> = new Subject<AbstractConfig>();
  const destroyed$: Subject<void> = new Subject<void>();

  create$.subscribe((val: PARAMS): void => latest$.next(create(val)));

  createFromConfig$.subscribe((config: AbstractConfig): void => {
    if (isNotDefined(adapterFn))
      throw new Error(`Factory "${id}" cannot create from config: adapter function is not provided`);
    create$.next(adapterFn(config));
  });

  destroyed$.subscribe(() => {
    create$.unsubscribe();
    create$.complete();
    createFromConfig$.unsubscribe();
    createFromConfig$.complete();
    latest$.complete();
    destroyed$.complete();
  });

  return {
    get id(): string {
      return id;
    },
    get type(): string {
      return type;
    },
    get latest$(): Subject<T> {
      return latest$;
    },
    get create$(): Subject<PARAMS> {
      return create$;
    },
    get createFromConfig$(): Subject<AbstractConfig> {
      return createFromConfig$;
    },
    get destroyed$(): Subject<void> {
      return destroyed$;
    }
  };
}
