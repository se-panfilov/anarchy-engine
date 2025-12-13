import type { Subscription } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, ILight, ILightConfig, ILightFactory, ILightRegistry } from '@/Engine/Light';
import { LightFactory, LightRegistry } from '@/Engine/Light';
import type { ISceneWrapper } from '@/Engine/Scene';

export function initLightsEntityPipe(
  scene: ISceneWrapper,
  lights: ReadonlyArray<ILightConfig>
): { lightAdded$: Subscription; lightCreated$: Subscription; lightFactory: ILightFactory; lightRegistry: ILightRegistry } {
  const lightFactory: ILightFactory = LightFactory();
  const lightRegistry: ILightRegistry = LightRegistry();

  const lightAdded$: Subscription = lightRegistry.added$.subscribe((wrapper: IAbstractLightWrapper<ILight>) => scene.addLight(wrapper));
  const lightCreated$: Subscription = lightFactory.entityCreated$.subscribe((wrapper: IAbstractLightWrapper<ILight>): void => lightRegistry.add(wrapper));
  lights.forEach((config: ILightConfig): IAbstractLightWrapper<ILight> => lightFactory.create(lightFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  return { lightAdded$, lightCreated$, lightFactory, lightRegistry };
}
