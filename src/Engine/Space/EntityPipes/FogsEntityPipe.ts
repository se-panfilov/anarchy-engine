import type { Subscription } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { IFogConfig, IFogFactory, IFogRegistry, IFogWrapper } from '@/Engine/Fog';
import { FogFactory, FogRegistry } from '@/Engine/Fog';
import type { ISceneWrapper } from '@/Engine/Scene';

export function initFogsEntityPipe(scene: ISceneWrapper, fogs: ReadonlyArray<IFogConfig>): { fogAdded$: Subscription; fogCreated$: Subscription; fogFactory: IFogFactory; fogRegistry: IFogRegistry } {
  const fogFactory: IFogFactory = FogFactory();
  const fogRegistry: IFogRegistry = FogRegistry();
  const fogAdded$: Subscription = fogRegistry.added$.subscribe((fog: IFogWrapper) => scene.setFog(fog));
  const fogCreated$: Subscription = fogFactory.entityCreated$.subscribe((fog: IFogWrapper): void => fogRegistry.add(fog));
  fogs.forEach((fog: IFogConfig): IFogWrapper => fogFactory.create(fogFactory.configToParams({ ...fog, tags: [...fog.tags, CommonTag.FromConfig] })));

  return { fogAdded$, fogCreated$, fogFactory, fogRegistry };
}
