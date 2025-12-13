// /* eslint-disable */
//
// type IFactory<P = any, T = any> = Readonly<{
//   type: string;
//   create: (params: P) => T;
// }>;
//
// type ExtractFactoryParams<F> = F extends IFactory<infer P, any> ? P : never;
// type ExtractFactoryReturn<F> = F extends IFactory<any, infer T> ? T : never;
//
// type IDestroyableMixin = Readonly<{ destroy: () => void }>;
// type IDestroyableFactory<F extends IFactory> = F & IDestroyableMixin;
//
// function DestroyableMixin<F extends IFactory>(factory: F): IDestroyableFactory<F> {
//   return {
//     ...factory,
//     destroy: (): void => console.log('destroyed')
//   };
// }
//
// type IFromConfigMixin<C, T> = Readonly<{ fromConfig: (config: C) => T }>;
// type IFromConfigFactory<F extends IFactory, C> = F & IFromConfigMixin<C, ExtractFactoryReturn<F>>;
//
// function FromConfigMixin<F extends IFactory, C>(factory: F): IFromConfigFactory<F, C> {
//   return {
//     ...factory,
//     fromConfig: (config: C): ExtractFactoryReturn<F> => {
//       console.log(config);
//       return { test: 'whatever' } as ExtractFactoryReturn<F>;
//     }
//   };
// }
//
// type IRegistrableMixin = Readonly<{ id: string; tags: ReadonlyArray<string> }>;
// type IRegistrableFactory<F extends IFactory> = F & IRegistrableMixin;
//
// function RegistrableMixin<F extends IFactory>(factory: F): IRegistrableFactory<F> {
//   return {
//     ...factory,
//     id: 'mock_id_1144',
//     tags: []
//   };
// }
//
// type IDynamicMixin = Readonly<{ isAlive: () => boolean }>;
// type IDynamicFactory<F extends IFactory> = F & IDynamicMixin;
//
// function DynamicMixin<F extends IFactory>(factory: F): IDynamicFactory<F> {
//   return {
//     ...factory,
//     isAlive: (): boolean => true
//   };
// }
//
// function Factory<P, T>(type: string, createFn: (params: P) => T): IFactory<P, T> {
//   return { type, create: (params: P): T => createFn(params) };
// }
//
// type ICatConfig = {
//   setConfig: () => void;
// };
//
// type ICatParams = {
//   name: string;
// };
//
// type ICat = {
//   name: string;
//   meow: () => string;
// };
//
// type IMeowMixin = {
//   meow: () => string;
// };
//
// type IMeowFactory<F extends IFactory> = F & IMeowMixin;
//
// type ICatFactory = IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin & IFromConfigMixin<ICatConfig, ICat> & IDestroyableMixin & IMeowMixin;
//
// function catCreate(params: Readonly<ICatParams>): ICat {
//   return {
//     name: params.name,
//     meow: (): string => 'meow!'
//   };
// }
//
// function CatFactoryMixin<F extends IFactory>(factory: F): F & IMeowFactory<F> {
//   return {
//     ...factory,
//     meow: () => 'meow'
//   };
// }
//
// function pipe<T>(initial: T, ...fns: Array<(arg: T) => T>): T {
//   return fns.reduce((acc: T, fn) => fn(acc), initial);
// }
//
// const catFactory70 = pipe(Factory('cat_factory', catCreate), DynamicMixin, RegistrableMixin, FromConfigMixin, DestroyableMixin, CatFactoryMixin);
// const catFactory77: ICatFactory = pipe(Factory('cat_factory', catCreate), DynamicMixin, RegistrableMixin, FromConfigMixin, DestroyableMixin, CatFactoryMixin);
//
// const cat70 = catFactory70.create(12323); // error
// const cat77: ICat = catFactory77.create({ name: 'Tom' }); //nice!
//
// console.log(cat70.name, cat77.meow());
//
// //types test 8: Alt types via mixins verbose
// const factory8: IFactory<ICatParams, ICat> = Factory('cat_factory', catCreate);
// const dynamicFactory8: IFactory<ICatParams, ICat> & IDynamicMixin = DynamicMixin(factory8);
// const dynamicRegistrableFactory8: IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin = RegistrableMixin(dynamicFactory8);
// const dynamicRegistrableFromConfigFactory8: IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin & IFromConfigMixin<ICatConfig, ICat> = FromConfigMixin(dynamicRegistrableFactory8);
// const dynamicRegistrableFromConfigDestroyableFactory8: IFactory<ICatParams, ICat> & IDynamicMixin & IRegistrableMixin & IFromConfigMixin<ICatConfig, ICat> & IDestroyableMixin =
//   DestroyableMixin(dynamicRegistrableFromConfigFactory8);
// const dynamicRegistrableFromConfigDestroyableCatFactory8: ICatFactory = CatFactoryMixin(dynamicRegistrableFromConfigDestroyableFactory8);
//
// const cat80 = dynamicRegistrableFromConfigDestroyableCatFactory8.create(12323); // error
// const cat88: ICat = dynamicRegistrableFromConfigDestroyableCatFactory8.create({ name: 'Tom' }); //nice!
//
// console.log(cat80.name, cat88.meow());
