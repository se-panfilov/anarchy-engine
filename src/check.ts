// type IFactory<P, T> = Readonly<{
//   type: string
//   create: (params: P) => T
// }>
//
// function Factory<Params, Entity>(type: string, createFn: (params: Params) => Entity): IFactory<Params, Entity> {
//   return {
//     type,
//     create: (params: Params): Entity => {
//       const entity: Entity = createFn(params);
//       //add to register
//       return entity;
//     }
//   };
// }
//
// type IDestroyableFactory<P, T> = IFactory<P, T> & Readonly<{
//   destroy: () => void
// }>
//
// function DestroyableFactory<P, T>(factory: IFactory<P, T>): IDestroyableFactory<P, T> {
//   return {
//     ...factory,
//     destroy: (): void => {
//       console.log('destroyed');
//     }
//   };
// }
//
// type IFromConfigFactory<P, T, C> = IFactory<P, T> & Readonly<{
//   fromConfig: (config: C) => T
// }>
//
// function FromConfigFactory<P, T, C>(factory: IFactory<P, T>): IFromConfigFactory<P, T, C> {
//   function configToParams(config: C): P {
//     return config as unknown as P;
//   }
//
//   return {
//     ...factory,
//     fromConfig: (config: C): T => {
//       return factory.create(configToParams(config));
//     }
//   };
// }
//
// type ICatParams = {
//   name: string
// }
//
// type ICat = {
//   name: string,
//   meow: () => string
// }
//
// type IDog = {
//   name: string,
//   bark: () => string
// }
//
// type ICatFactory = IFactory<ICatParams, ICat>
// type IDogFactory = IFactory<ICatParams, ICat>
//
// function CatFactory(): ICatFactory {
//
//   function catCreate(params: Readonly<ICatParams>): ICat {
//     return {
//       name: params.name,
//       meow: (): string => 'meow!'
//     }
//   }
//
//   const factory: IFactory<ICatParams, ICat> = Factory('cat_factory', catCreate);
//
//   return {
//     ...factory,
//     create: (params: Readonly<ICatParams>): ICat => {
//       return factory.create(params)
//     }
//   };
// }
//
