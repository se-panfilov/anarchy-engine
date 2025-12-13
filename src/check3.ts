// /* eslint-disable */
//
// type IFactory = Readonly<{
//   type: string;
//   create: (params: any) => any;
// }>;
//
// // type IDestroyableFactory<F extends IFactory<any, any>> = F &
// //   Readonly<{
// //     destroy: () => void;
// //   }>;
// // type IFromConfigFactory<F extends IFactory<any, T>, T, C> = F &
// //   Readonly<{
// //     fromConfig: (config: C) => T;
// //   }>;
// // type IRegistrableFactory<F extends IFactory<any, any>> = F &
// //   Readonly<{
// //     id: string;
// //     tags: ReadonlyArray<string>;
// //   }>;
// // type IDynamicFactory<F extends IFactory<any, any>> = F &
// //   Readonly<{
// //     isAlive: () => boolean;
// //   }>;
//
// function Factory<Params, Entity>(type: string, createFn: (params: Params) => Entity): IFactory {
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
// type ICatParams = {
//   name: string;
// };
//
// type ICat = {
//   name: string;
//   meow: () => string;
// };
//
// type ICatFactory = IFactory & Readonly<{
//   create: (params: ICatParams) => ICat;
// }>;
//
// function CatFactory(type: string, createFn: (params: ICatParams) => ICat): ICatFactory {
//   return {
//     type,
//     create: (params: ICatParams): ICat => {
//       const entity: ICat = createFn(params);
//       //add to register
//       return entity;
//     }
//   };
// }
//
// function catCreate(params: Readonly<ICatParams>): ICat {
//   return {
//     name: params.name,
//     meow: (): string => 'meow!'
//   };
// }
//
// CatFactory('type', catCreate).create(12323) //this is allowed because of any, but I want crete() to accept only ICatParams
