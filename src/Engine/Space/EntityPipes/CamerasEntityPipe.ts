import type { Subscription } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { ICameraConfig, ICameraFactory, ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry } from '@/Engine/Camera';
import type { ISceneWrapper } from '@/Engine/Scene';

export function initCamerasEntityPipe(
  scene: ISceneWrapper,
  cameras: ReadonlyArray<ICameraConfig>
): { cameraAdded$: Subscription; cameraCreated$: Subscription; cameraFactory: ICameraFactory; cameraRegistry: ICameraRegistry } {
  const cameraFactory: ICameraFactory = CameraFactory();
  const cameraRegistry: ICameraRegistry = CameraRegistry();

  const cameraAdded$: Subscription = cameraRegistry.added$.subscribe((wrapper: ICameraWrapper) => scene.addCamera(wrapper));
  const cameraCreated$: Subscription = cameraFactory.entityCreated$.subscribe((wrapper: ICameraWrapper): void => cameraRegistry.add(wrapper));
  cameras.forEach((config: ICameraConfig): ICameraWrapper => cameraFactory.create(cameraFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  return { cameraAdded$, cameraCreated$, cameraFactory, cameraRegistry };
}
