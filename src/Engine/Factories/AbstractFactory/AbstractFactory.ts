import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Factory, ReactiveWrapper } from '@Engine/Models';
import type { AbstractConfig } from '@Engine/Launcher/Models';
import { isNotDefined } from '@Engine/Utils';
import type { CreateFN } from '@Engine/Factories/AbstractFactory/Models';

export function AbstractFactory<T extends ReactiveWrapper<ENT>, ENT, PRMS>(
  type: string,
  create: CreateFN<T, PRMS>,
  adapterFn?: (config: AbstractConfig) => PRMS
): Factory<T, ENT, PRMS> {
  const id: string = type + '_factory_' + nanoid();
  const latest$: Subject<T> = new Subject<T>();
  const create$: Subject<PRMS> = new Subject<PRMS>();
  const createFromConfig$: Subject<AbstractConfig> = new Subject<AbstractConfig>();
  const destroyed$: Subject<void> = new Subject<void>();

  create$.subscribe((params: PRMS): void => latest$.next(create(params)));

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
      return type + '_factory';
    },
    get latest$(): Subject<T> {
      return latest$;
    },
    get create$(): Subject<PRMS> {
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

type FactoryCore<T extends ReactiveWrapper<ENT>, ENT, PRMS> = Pick<
  Factory<T, ENT, PRMS>,
  'id' | 'type' | 'latest$' | 'create$'
>;

function buildCore<T extends ReactiveWrapper<ENT>, ENT, PRMS>(
  type: string,
  create: CreateFN<T, PRMS>
): FactoryCore<T, ENT, PRMS> {
  const id: string = type + '_' + nanoid();
  const latest$: Subject<T> = new Subject<T>();
  const create$: Subject<PRMS> = new Subject<PRMS>();

  create$.subscribe((params: PRMS): void => latest$.next(create(params)));

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
    get create$(): Subject<PRMS> {
      return create$;
    }
  };
}

type BuilderFromConfig<T extends ReactiveWrapper<ENT>, ENT, PRMS> = Pick<Factory<T, ENT, PRMS>, 'createFromConfig$'>;

function builderFromConfig<T extends ReactiveWrapper<ENT>, ENT, PRMS>(
  factory: FactoryCore<T, ENT, PRMS>,
  adapterFn?: (config: AbstractConfig) => PRMS
): BuilderFromConfig<T, ENT, PRMS> {
  const createFromConfig$: Subject<AbstractConfig> = new Subject<AbstractConfig>();

  createFromConfig$.subscribe((config: AbstractConfig): void => {
    if (isNotDefined(adapterFn))
      throw new Error(`Factory "${factory.id}" cannot create from config: adapter function is not provided`);
    factory.create$.next(adapterFn(config));
  });

  return {
    get createFromConfig$(): Subject<AbstractConfig> {
      return createFromConfig$;
    }
  };
}

type BuilderDestroyable<T extends ReactiveWrapper<ENT>, ENT, PRMS> = Pick<Factory<T, ENT, PRMS>, 'destroyed$'>;

function builderDestroyable<T extends ReactiveWrapper<ENT>, ENT, PRMS>(
  factory: FactoryCore<T, ENT, PRMS> & BuilderFromConfig<T, ENT, PRMS>
): BuilderDestroyable<T, ENT, PRMS> {
  const destroyed$: Subject<void> = new Subject<void>();

  destroyed$.subscribe(() => {
    factory.create$.unsubscribe();
    factory.create$.complete();
    factory.createFromConfig$.unsubscribe();
    factory.createFromConfig$.complete();
    factory.latest$.complete();
    destroyed$.complete();
  });

  return {
    get destroyed$(): Subject<void> {
      return destroyed$;
    }
  };
}

const pipe = <T extends any[], U>(fn1: (...args: T) => U, ...fns: Array<(a: U) => U>) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: U) => nextFn(prevFn(value)),
    (value) => value
  );
  return (...args: T) => piped(fn1(...args));
};

function build<T extends ReactiveWrapper<ENT>, ENT, PRMS>(
  type: string,
  create: CreateFN<T, PRMS>,
  adapterFn?: (config: AbstractConfig) => PRMS
): Factory<T, ENT, PRMS> {
  const factoryCore: FactoryCore<T, ENT, PRMS> = buildCore<T, ENT, PRMS>(type, create);
  const factoryFromConfig: BuilderFromConfig<T, ENT, PRMS> = builderFromConfig(factoryCore, adapterFn);
  const factoryCoreAndConfig: FactoryCore<T, ENT, PRMS> & BuilderFromConfig<T, ENT, PRMS> = {
    ...factoryCore,
    ...factoryFromConfig
  };

  //Alternative bia pipe
  // const piped: Factory<T, ENT, PRMS> = pipe(
  //   () => buildCore<T, ENT, PRMS>(type, create),
  //   (factoryCore) => builderFromConfig(factoryCore, adapterFn),
  //   (factoryCoreAndConfig) => builderDestroyable(factoryCoreAndConfig)
  // );

  return {
    ...factoryCoreAndConfig,
    ...builderDestroyable(factoryCoreAndConfig)
  };
}

const sceneFactory = build(
  'scene',
  () => ({} as any),
  () => ({} as any)
);
console.log(sceneFactory.latest$);
