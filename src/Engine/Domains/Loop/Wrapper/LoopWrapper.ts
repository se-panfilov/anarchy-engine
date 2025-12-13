import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls';
import type { ILoopParams, ILoopWrapper, LoopFn } from '@/Engine/Domains/Loop/Models';
import type { IRendererWrapper } from '@/Engine/Domains/Renderer';
import type { ISceneWrapper } from '@/Engine/Domains/Scene';
import { isDefined } from '@/Engine/Utils';

import { getUtils } from './utils';

export function LoopWrapper(params: ILoopParams): ILoopWrapper {
  let _delta: number = 0;
  const entity: LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, delta: number, controlsRegistry: IControlsRegistry, camera?: Readonly<ICameraWrapper>): void => {
    _delta = delta;

    //just for control's damping
    controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper) => {
      if (controls.entity.enableDamping) controls.entity.update(delta);
    });

    if (isDefined(camera)) renderer.entity.render(scene.entity, camera.entity);
  };

  return {
    ...AbstractWrapper(entity, WrapperType.Loop, params),
    ...getUtils(entity),
    entity,
    tags: params.tags,
    get delta(): number {
      return _delta;
    }
  };
}
