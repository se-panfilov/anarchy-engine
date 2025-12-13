/* eslint-disable */

type IFactory<P = any, T = any> = Readonly<{
  type: string;
  create: (params: P) => T;
}>;

type ExtractFactoryParams<F> = F extends IFactory<infer P, any> ? P : never;
type ExtractFactoryReturn<F> = F extends IFactory<any, infer T> ? T : never;

type IDestroyableMixin = Readonly<{ destroy: () => void }>;
type IDestroyableFactory<F extends IFactory> = F & IDestroyableMixin;

function DestroyableMixin<F extends IFactory>(factory: F): F & IDestroyableMixin {
  return {
    ...factory,
    destroy: () => console.log('destroyed')
  };
}

type IFromConfigMixin<C, T> = Readonly<{ fromConfig: (config: C) => T }>;
type IFromConfigFactory<F extends IFactory<any, T>, T, C> = F & IFromConfigMixin<C, T>;

function FromConfigMixin<F extends IFactory, C>(factory: F): F & IFromConfigMixin<C, ExtractFactoryReturn<F>> {
  return {
    ...factory,
    fromConfig: (config: C) => ({ ...factory, config, createdFromConfig: true } as ExtractFactoryReturn<F>)
  };
}

type IRegistrableMixin = Readonly<{ id: string; tags: ReadonlyArray<string> }>;
type IRegistrableFactory<F extends IFactory> = F & IRegistrableMixin;

function RegistrableMixin<F extends IFactory>(factory: F): F & IRegistrableMixin {
  return {
    ...factory,
    id: 'mock_id_1144',
    tags: []
  };
}

type IDynamicMixin = Readonly<{ isAlive: () => boolean }>;
type IDynamicFactory<F extends IFactory> = F & IDynamicMixin;

function DynamicMixin<F extends IFactory>(factory: F): F & IDynamicMixin {
  return {
    ...factory,
    isAlive: () => true
  };
}

function Factory<P, T>(type: string, createFn: (params: P) => T): IFactory {
  return { type, create: (params: P): T => createFn(params) };
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

type ICatMixin = {
  meow: () => string;
};

type ICatFactory = IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin & IFromConfigMixin<ICatConfig, ICat> & IDestroyableMixin & ICatMixin;

function catCreate(params: Readonly<ICatParams>): ICat {
  return {
    name: params.name,
    meow: (): string => 'meow!'
  };
}

function CatFactoryMixin<F extends IFactory>(factory: F): F & ICatMixin {
  return {
    ...factory,
    meow: () => 'meow'
  };
}

const factory: IFactory = Factory('cat_factory', catCreate);
const dynamicFactory = DynamicMixin(factory);
const dynamicRegistrableFactory = RegistrableMixin(dynamicFactory);
const dynamicRegistrableFromConfigFactory = FromConfigMixin(dynamicRegistrableFactory);
const dynamicRegistrableFromConfigDestroyableFactory = DestroyableMixin(dynamicRegistrableFromConfigFactory);
const dynamicRegistrableFromConfigDestroyableCatFactory = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory);

dynamicRegistrableFromConfigDestroyableCatFactory.create(12323); // error
dynamicRegistrableFromConfigDestroyableCatFactory.create({ name: 'Tom' }); //nice!
