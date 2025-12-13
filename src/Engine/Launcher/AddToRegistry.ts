import type { IAbstractConfig } from '@Engine/Launcher/Models';
import type { IDestroyableFactory, IFactory, IProtectedRegistry, IWrapper } from '@Engine/Models';
import { isDestroyedFactory } from '@Engine/Utils';

export function addToRegistry<E, W extends IWrapper<E>, C extends IAbstractConfig>(
  configList: ReadonlyArray<C>,
  // eslint-disable-next-line functional/prefer-immutable-types
  factory: IFactory<W, E, never, C> | IDestroyableFactory<W, E, never, C>,
  registry: IProtectedRegistry<W>
): void {
  if (isDestroyedFactory(factory)) throw new Error('Cannot add to registry: a factory is already destroyed');
  configList.forEach((config: C): void => registry.add((factory as IFactory<W, E, never, C>).fromConfig(config)));
}
