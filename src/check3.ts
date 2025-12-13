/* eslint-disable */

type IFactory<P = any, T = any> = Readonly<{
  type: string;
  create: (params: P) => T;
}>;

type ExtractFactoryParams<F> = F extends IFactory<infer P, any> ? P : never;
type ExtractFactoryReturn<F> = F extends IFactory<any, infer T> ? T : never;

type IDestroyableMixin = Readonly<{ destroy: () => void }>;
type IDestroyableFactory<F extends IFactory> = F & IDestroyableMixin;

function DestroyableMixin<F extends IFactory>(factory: F): IDestroyableFactory<F> {
  return {
    ...factory,
    destroy: (): void => console.log('destroyed')
  };
}

type IFromConfigMixin<C, T> = Readonly<{ fromConfig: (config: C) => T }>;
type IFromConfigFactory<F extends IFactory, C> = F & IFromConfigMixin<C, ExtractFactoryReturn<F>>;

function FromConfigMixin<F extends IFactory, C>(factory: F): IFromConfigFactory<F, C> {
  return {
    ...factory,
    fromConfig: (config: C): ExtractFactoryReturn<F> => {
      console.log(config);
      return { test: 'whatever' } as ExtractFactoryReturn<F>;
    }
  };
}

type IRegistrableMixin = Readonly<{ id: string; tags: ReadonlyArray<string> }>;
type IRegistrableFactory<F extends IFactory> = F & IRegistrableMixin;

function RegistrableMixin<F extends IFactory>(factory: F): IRegistrableFactory<F> {
  return {
    ...factory,
    id: 'mock_id_1144',
    tags: []
  };
}

type IDynamicMixin = Readonly<{ isAlive: () => boolean }>;
type IDynamicFactory<F extends IFactory> = F & IDynamicMixin;

function DynamicMixin<F extends IFactory>(factory: F): IDynamicFactory<F> {
  return {
    ...factory,
    isAlive: (): boolean => true
  };
}

function Factory<P, T>(type: string, createFn: (params: P) => T): IFactory<P, T> {
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

type IMeowMixin = {
  meow: () => string;
};

type IMeowFactory<F extends IFactory> = F & IMeowMixin;

type ICatFactory = IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin & IFromConfigMixin<ICatConfig, ICat> & IDestroyableMixin & IMeowMixin;

function catCreate(params: Readonly<ICatParams>): ICat {
  return {
    name: params.name,
    meow: (): string => 'meow!'
  };
}

function CatFactoryMixin<F extends IFactory>(factory: F): F & IMeowFactory<F> {
  return {
    ...factory,
    meow: () => 'meow'
  };
}

//types test 1: no verbose types
const factory1 = Factory('cat_factory', catCreate);
const dynamicFactory1 = DynamicMixin(factory1);
const dynamicRegistrableFactory1 = RegistrableMixin(dynamicFactory1);
const dynamicRegistrableFromConfigFactory1 = FromConfigMixin(dynamicRegistrableFactory1);
const dynamicRegistrableFromConfigDestroyableFactory1 = DestroyableMixin(dynamicRegistrableFromConfigFactory1);
const dynamicRegistrableFromConfigDestroyableCatFactory1 = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory1);

const cat10 = dynamicRegistrableFromConfigDestroyableCatFactory1.create(12323); // error
const cat11 = dynamicRegistrableFromConfigDestroyableCatFactory1.create({ name: 'Tom' }); //nice!

console.log(cat10.name, cat11.meow());

//types test 2: Partial verbose types
const factory2 = Factory('cat_factory', catCreate);
const dynamicFactory2 = DynamicMixin(factory2);
const dynamicRegistrableFactory2 = RegistrableMixin(dynamicFactory2);
const dynamicRegistrableFromConfigFactory2 = FromConfigMixin(dynamicRegistrableFactory2);
const dynamicRegistrableFromConfigDestroyableFactory2 = DestroyableMixin(dynamicRegistrableFromConfigFactory2);
const dynamicRegistrableFromConfigDestroyableCatFactory2: ICatFactory = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory2);

const cat20 = dynamicRegistrableFromConfigDestroyableCatFactory2.create(12323); // error
const cat22: ICat = dynamicRegistrableFromConfigDestroyableCatFactory2.create({ name: 'Tom' }); //nice!

console.log(cat20.name, cat22.meow());

//types test 3: Fully verbose types
const factory3: IFactory<ICatParams, ICat> = Factory('cat_factory', catCreate);
const dynamicFactory3: IDynamicFactory<IFactory<ICatParams, ICat>> = DynamicMixin(factory3);
const dynamicRegistrableFactory3: IRegistrableFactory<IFactory<ICatParams, ICat>> = RegistrableMixin(dynamicFactory3);
const dynamicRegistrableFromConfigFactory3: IFromConfigFactory<IFactory<ICatParams, ICat>, ICatConfig> = FromConfigMixin(dynamicRegistrableFactory3);
const dynamicRegistrableFromConfigDestroyableFactory3: IDestroyableFactory<IFactory<ICatParams, ICat>> = DestroyableMixin(dynamicRegistrableFromConfigFactory3);
const dynamicRegistrableFromConfigDestroyableCatFactory3: ICatFactory = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory3);

const cat30 = dynamicRegistrableFromConfigDestroyableCatFactory3.create(12323); // error
const cat33: ICat = dynamicRegistrableFromConfigDestroyableCatFactory3.create({ name: 'Tom' }); //nice!

console.log(cat30.name, cat33.meow());

//types test 4: Fully precision verbose types
const factory4: IFactory<ICatParams, ICat> = Factory('cat_factory', catCreate);
const dynamicFactory4: IDynamicFactory<IFactory<ICatParams, ICat>> = DynamicMixin(factory4);
const dynamicRegistrableFactory4: IRegistrableFactory<IDynamicFactory<IFactory<ICatParams, ICat>>> = RegistrableMixin(dynamicFactory4);
const dynamicRegistrableFromConfigFactory4: IFromConfigFactory<IRegistrableFactory<IDynamicFactory<IFactory<ICatParams, ICat>>>, ICatConfig> = FromConfigMixin(dynamicRegistrableFactory4);
const dynamicRegistrableFromConfigDestroyableFactory4: IDestroyableFactory<IFromConfigFactory<IRegistrableFactory<IDynamicFactory<IFactory<ICatParams, ICat>>>, ICatConfig>> =
  DestroyableMixin(dynamicRegistrableFromConfigFactory4);
const dynamicRegistrableFromConfigDestroyableCatFactory4: ICatFactory = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory4); //type error

const cat40 = dynamicRegistrableFromConfigDestroyableCatFactory4.create(12323); // error
const cat44: ICat = dynamicRegistrableFromConfigDestroyableCatFactory4.create({ name: 'Tom' }); //nice!

console.log(cat40.name, cat44.meow());

//types test 5: LAZY verbose types
const factory5: IFactory<ICatParams, ICat> = Factory('cat_factory', catCreate);
const dynamicFactory5: IDynamicFactory<IFactory> = DynamicMixin(factory5);
const dynamicRegistrableFactory5: IRegistrableFactory<IFactory> = RegistrableMixin(dynamicFactory5);
const dynamicRegistrableFromConfigFactory5: IFromConfigFactory<IFactory, ICatConfig> = FromConfigMixin(dynamicRegistrableFactory5);
const dynamicRegistrableFromConfigDestroyableFactory5: IDestroyableFactory<IFactory> = DestroyableMixin(dynamicRegistrableFromConfigFactory5);
const dynamicRegistrableFromConfigDestroyableCatFactory5: ICatFactory = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory5);

const cat50 = dynamicRegistrableFromConfigDestroyableCatFactory5.create(12323); // error
const cat55: ICat = dynamicRegistrableFromConfigDestroyableCatFactory5.create({ name: 'Tom' }); //nice!

console.log(cat50.name, cat55.meow());

//types test 6: Chain

const cat60 = CatFactoryMixin(DestroyableMixin(FromConfigMixin(RegistrableMixin(DynamicMixin(Factory('cat_factory', catCreate)))))).create(12323);
const cat66: ICat = CatFactoryMixin(DestroyableMixin(FromConfigMixin(RegistrableMixin(DynamicMixin(Factory('cat_factory', catCreate)))))).create({ name: 'Tom' });

console.log(cat60.name, cat66.meow());

//types test 7: Pipe

type Fn = (arg: any) => any;

type PipableFunction<A, B> = (a: A) => B;

type PipeResult<T, Fns extends any[]> = Fns extends [PipableFunction<T, infer U>, ...infer Rest] ? PipeResult<U, Rest> : T;

// function pipe<T, Fns extends PipableFunction<any, any>[]>(initial: T, ...fns: Fns): PipeResult<T, Fns> {
//   return fns.reduce((acc: T, fn) => fn(acc), initial) as PipeResult<T, Fns>;
// }

function pipe<T>(initial: T, ...fns: Array<(arg: T) => T>): T {
  return fns.reduce((acc: T, fn) => fn(acc), initial);
}

const catFactory70 = pipe(Factory('cat_factory', catCreate), DynamicMixin, RegistrableMixin, FromConfigMixin, DestroyableMixin, CatFactoryMixin);
const catFactory77: ICatFactory = pipe(Factory('cat_factory', catCreate), DynamicMixin, RegistrableMixin, FromConfigMixin, DestroyableMixin, CatFactoryMixin);

const cat70 = catFactory70.create(12323); // error
const cat77: ICat = catFactory77.create({ name: 'Tom' }); //nice!

console.log(cat70.name, cat77.meow());

//types test 8: Alt types via mixins verbose
const factory8: IFactory<ICatParams, ICat> = Factory('cat_factory', catCreate);
const dynamicFactory8: IFactory<ICatParams, ICat> & IDynamicMixin = DynamicMixin(factory8);
const dynamicRegistrableFactory8: IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin = RegistrableMixin(dynamicFactory8);
const dynamicRegistrableFromConfigFactory8: IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin & IFromConfigMixin<ICatConfig, ICat> = FromConfigMixin(dynamicRegistrableFactory8);
const dynamicRegistrableFromConfigDestroyableFactory8: IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin & IFromConfigMixin<ICatConfig, ICat> & IDestroyableMixin =
  DestroyableMixin(dynamicRegistrableFromConfigFactory8);
const dynamicRegistrableFromConfigDestroyableCatFactory8: ICatFactory = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory8);

const cat80 = dynamicRegistrableFromConfigDestroyableCatFactory8.create(12323); // error
const cat88: ICat = dynamicRegistrableFromConfigDestroyableCatFactory8.create({ name: 'Tom' }); //nice!

console.log(cat80.name, cat88.meow());
