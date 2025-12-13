import type { IFactory, IProtectedRegistry, IWrapper } from '@Engine/Models';
import type { IAbstractConfig } from '@Engine/Launcher/Models';

export function addToRegistry<E, W extends IWrapper<E>, C extends IAbstractConfig>(
  configList: ReadonlyArray<C>,
  factory: IFactory<W, E, never, C>,
  registry: IProtectedRegistry<W>
): void {
  configList.forEach((config: C): void => registry.add(factory.fromConfig(config)));
}
