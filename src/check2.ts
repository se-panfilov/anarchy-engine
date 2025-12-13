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

type IDestroyableFactory<P, T> = IFactory<P, T> &
  Readonly<{
    destroy: () => void;
  }>;
type IFromConfigFactory<P, T, C> = IFactory<P, T> &
  Readonly<{
    fromConfig: (config: C) => T;
  }>;
type IRegistrableFactory<P, T> = IFactory<P, T> &
  Readonly<{
    id: string;
    tags: ReadonlyArray<string>;
  }>;
type IDynamicFactory<P, T> = IFactory<P, T> &
  Readonly<{
    isAlive: () => boolean;
  }>;

function DestroyableFactory<P, T>(factory: IFactory<P, T>): IDestroyableFactory<P, T> {
  return {
    ...factory,
    destroy: (): void => {
      console.log('destroyed');
    }
  };
}

function RegistrableFactory<P, T>(factory: IFactory<P, T>, tags: ReadonlyArray<string>): IRegistrableFactory<P, T> {
  return {
    ...factory,
    id: 'some-id-123',
    tags
  };
}

function FromConfigFactory<P, T, C>(factory: IFactory<P, T>): IFromConfigFactory<P, T, C> {
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

function DynamicFactory<P, T>(factory: IFactory<P, T>): IDynamicFactory<P, T> {
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

type ICatFactory<P, T, C> = IDestroyableFactory<P, T> & IFromConfigFactory<P, T, C> & IRegistrableFactory<P, T> & IDynamicFactory<P, T>;

//error: Type DynamicFactory<Readonly<ICatParams>, ICat> is not assignable to type ICatFactory<ICatParams, ICat, ICatConfig> Property destroy is missing in type IDynamicFactory<Readonly<ICatParams>, ICat> but required in type Readonly<{ destroy: () => void; }>
const factory: ICatFactory<ICatParams, ICat, ICatConfig> = DynamicFactory(FromConfigFactory(RegistrableFactory(DestroyableFactory(Factory('type-1', catCreate)), [])));

factory.isAlive();

function getFactory<T, P>(factory: IFactory<T, P>): void {
  console.log(factory);
}

getFactory(factory);
