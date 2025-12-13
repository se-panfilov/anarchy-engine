import type { IAbstractRegistry, IFactory, IProtectedRegistry, ISceneObject, IWrapper } from '@Engine/Models';
import type { IAbstractConfig } from '@Engine/Launcher/Models';

export function addToRegistry<
  E extends ISceneObject,
  W extends IWrapper<E>,
  C extends IAbstractConfig,
  R extends IAbstractRegistry<W>
>(configList: ReadonlyArray<C>, factory: IFactory<W, E, never, C>, registry: IProtectedRegistry<W, R>): void {
  configList.forEach((config: C): void => registry.add(factory.fromConfig(config)));
}
