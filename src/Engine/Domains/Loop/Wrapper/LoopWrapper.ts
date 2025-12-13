import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Domains/Camera';
import { CameraTag } from '@/Engine/Domains/Camera';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls';
import type { ILoopParams, ILoopWrapper, LoopFn } from '@/Engine/Domains/Loop/Models';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer';
import type { ISceneWrapper } from '@/Engine/Domains/Scene';
import { isDefined } from '@/Engine/Utils';

import { getUtils } from './utils';

export function LoopWrapper(params: ILoopParams): ILoopWrapper {
  let _delta: number = 0;
  const entity: LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, delta: number, controlsRegistry: IControlsRegistry, cameraRegistry: ICameraRegistry): void => {
    _delta = delta;

    //just for control's damping
    controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper): void => {
      if (controls.entity.enableDamping) controls.entity.update(delta);
    });

    const activeCamera: ICameraWrapper | undefined = cameraRegistry.getUniqByTag(CameraTag.Active);
    if (isDefined(activeCamera)) renderer.entity.render(scene.entity, activeCamera.entity);
  };

  return {
    ...AbstractWrapper(entity, WrapperType.Loop, params),
    ...getUtils(entity),
    entity,
    tags: params.tags,
    delta: _delta
  };
}
