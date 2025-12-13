import type { ICameraService, ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcherConfig, IIntersectionsWatcherParams } from '@/Engine/Intersections/Models';
import type { IMouseService } from '@/Engine/Mouse';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: IIntersectionsWatcherConfig, mouseService: IMouseService, cameraService: ICameraService): IIntersectionsWatcherParams {
  const camera: ICameraWrapper | undefined = cameraService.getRegistry().findByName(config.cameraName);
  if (isNotDefined(camera)) throw new Error(`configToParams: Cannot find camera "${config.cameraName}" for intersections watcher "${config.name}".`);

  return {
    ...config,
    position$: mouseService.position$,
    camera
  };
}
