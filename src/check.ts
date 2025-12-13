type IAbstractFactory<P, T> = Readonly<{
  type: string
  create: (params: P) => T
}>

function AbstractFactory<Params, Entity>(type: string, createFn: (params: Params) => Entity): IAbstractFactory<Params, Entity> {
  return {
    type,
    create: (params: Params): Entity => {
      const entity: Entity = createFn(params);
      //add to register
      return entity;
    }
  };
}

type IDestroyableFactory<P, T> = IAbstractFactory<P, T> & Readonly<{
  destroy: () => void
}>

function DestroyableFactory<P, T>(factory: IAbstractFactory<P, T>): IDestroyableFactory<P, T> {
  return {
    ...factory,
    destroy: (): void => {
      console.log('destroyed');
    }
  };
}

type IFromConfigFactory<P, T, C> = IAbstractFactory<P, T> & Readonly<{
  fromConfig: (config: C) => T
}>

function FromConfigFactory<P, T, C>(factory: IAbstractFactory<P, T>): IFromConfigFactory<P, T, C> {
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

type ICatParams = {
  name: string
}

type ICat = {
  name: string,
  meow: () => string
}

type ICatFactory = IAbstractFactory<ICatParams, ICat>


function CatFactory(): ICatFactory {

  function catCreate(params: Readonly<ICatParams>): ICat {
    return {
      name: params.name,
      meow: (): string => 'meow!'
    }
  }

  const factory: IAbstractFactory<ICatParams, ICat> = AbstractFactory('cat_factory', catCreate);

  return {
    ...factory,
    create: (params: Readonly<ICatParams>): ICat => {
      return factory.create(params)
    }
  };
}
