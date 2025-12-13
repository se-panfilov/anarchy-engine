import { AbstractWrapper } from '@Engine/Domains/Abstract';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import type { ISceneWrapper } from '@Engine/Domains/Scene';

import type { ILoopParams, ILoopWrapper, LoopFn } from '../Models';
import { getUtils } from './utils';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls';

export function LoopWrapper(params: ILoopParams): ILoopWrapper {
  let _delta: number = 0;
  const entity: LoopFn = (renderer: Readonly<IRendererWrapper>, scene: Readonly<ISceneWrapper>, camera: Readonly<ICameraWrapper>, delta: number, controlsRegistry: IControlsRegistry): void => {
    _delta = delta;
    controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper) => {
      // TODO (S.Panfilov) this should work and be true
      console.log('controls.entity.enableDamping', controls.entity.enableDamping);
      // TODO (S.Panfilov) delta?
      if (controls.entity.enableDamping) controls.entity.update();
    });
    renderer.entity.render(scene.entity, camera.entity);
  };

  return {
    ...AbstractWrapper(entity, params),
    ...getUtils(entity),
    entity,
    tags: params.tags,
    get delta(): number {
      return _delta;
    }
  };
}
