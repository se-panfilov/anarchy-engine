import type { TAppCanvas } from '@/Engine/App';
import type { TSceneConfig, TScenesService, TSceneWrapper } from '@/Engine/Scene';
import type { TSpaceServices } from '@/Engine/Space/Models';
import { isNotDefined } from '@/Engine/Utils';

import { initServices } from './SpaceServicesLauncher';

export async function prepareServices(canvas: TAppCanvas, scenes: ReadonlyArray<TSceneConfig>): Promise<Readonly<{ services: TSpaceServices; activeSceneW: TSceneWrapper }>> {
  let activeSceneW: TSceneWrapper;
  const p = new Promise<{ services: TSpaceServices; activeSceneW: TSceneWrapper }>((resolve) => {
    const services: TSpaceServices = initServices(canvas, (scenesService: TScenesService): TSceneWrapper | never => {
      scenesService.createFromConfig(scenes);
      const sceneW: TSceneWrapper | undefined = scenesService.findActive();
      if (isNotDefined(sceneW)) throw new Error(`Cannot find an active scene for space "${name}" during space's services initialization.`);
      activeSceneW = sceneW;

      // TODO debug (window as any).sceneW
      // (window as any).sceneW = sceneW;

      resolve({ services, activeSceneW });
      return activeSceneW;
    });
  });

  return p;
}
