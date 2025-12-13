/* eslint-disable */

type IFactory<P, T> = Readonly<{
  type: string;
  create: (params: P) => T;
}>;

function Factory<Params, Entity>(type: string, createFn: (params: Params) => Entity): IFactory<Params, Entity> {
  return {
    type,
    create: (params: Params): Entity => {
      const entity: Entity = createFn(params);
      //add to register
      return entity;
    }
  };
}

type IDestroyableFactory<F extends IFactory<any, any>> = F &
  Readonly<{
    destroy: () => void;
  }>;
type IFromConfigFactory<F extends IFactory<any, T>, T, C> = F &
  Readonly<{
    fromConfig: (config: C) => T;
  }>;
type IRegistrableFactory<F extends IFactory<any, any>> = F &
  Readonly<{
    id: string;
    tags: ReadonlyArray<string>;
  }>;
type IDynamicFactory<F extends IFactory<any, any>> = F &
  Readonly<{
    isAlive: () => boolean;
  }>;

function DestroyableFactory<F extends IFactory<any, any>>(factory: F): F & IDestroyableFactory<F> {
  return {
    ...factory,
    destroy: (): void => {
      console.log('destroyed');
    }
  };
}

function RegistrableFactory<F extends IFactory<any, any>>(factory: F, tags: ReadonlyArray<string>): F & IRegistrableFactory<F> {
  return {
    ...factory,
    id: 'some-id-123',
    tags
  };
}

function FromConfigFactory<F extends IFactory<any, any>, P, T, C>(factory: F): F & IFromConfigFactory<F, T, C> {
  function configToParams(config: C): P {
    return config as unknown as P;
  }

  return {
    ...factory,
    fromConfig: (config: C): T => {
      return factory.create(configToParams(config));
    }
  };
}

function DynamicFactory<F extends IFactory<any, any>>(factory: F): F & IDynamicFactory<F> {
  return {
    ...factory,
    isAlive: (): boolean => true
  };
}

type ICatConfig = {
  setConfig: () => void;
};
type ICatParams = {
  name: string;
};
type ICat = {
  name: string;
  meow: () => string;
};

function catCreate(params: Readonly<ICatParams>): ICat {
  return {
    name: params.name,
    meow: (): string => 'meow!'
  };
}

type ICatFactory<P, T, C> = IDestroyableFactory<IFactory<P, T>> & IFromConfigFactory<IFactory<P, T>, T, C> & IRegistrableFactory<IFactory<P, T>> & IDynamicFactory<IFactory<P, T>>;

const factory: ICatFactory<ICatParams, ICat, ICatConfig> = DynamicFactory(FromConfigFactory(RegistrableFactory(DestroyableFactory(Factory('type-1', catCreate)), [])));

factory.destroy(); //IDestroyableFactory
factory.fromConfig({} as any); //IFromConfigFactory
console.log(factory.tags); //IRegistrableFactory
factory.isAlive(); //IDynamicFactory

function getFactory<T, P>(factory: IFactory<T, P>): void {
  console.log(factory);
}

getFactory(factory);
