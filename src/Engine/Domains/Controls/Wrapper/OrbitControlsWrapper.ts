import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IOrbitControlsParams, IOrbitControlsWrapper } from '@/Engine/Domains/Controls/Models';
import { getOrbitControlsAccessors } from '@/Engine/Domains/Controls/Wrapper/OrbitControlsAccessors';
import { applyOrbitControlsParams } from '@/Engine/Domains/Controls/Wrapper/OrbitControlsWrapperHelper';
import { isDefined } from '@/Engine/Utils';

export function OrbitControlsWrapper(params: IOrbitControlsParams): IOrbitControlsWrapper {
  const entity: OrbitControls = new OrbitControls(params.camera.entity, params.canvas);
  if (isDefined(params.target)) {
    entity.target.set(params.target.getX(), params.target.getY(), params.target.getZ());
    entity.update();
  }
  const update = (): boolean => entity.update();

  function enable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = true;
    entity.update();
  }

  function disable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = false;
    entity.update();
  }

  const isEnable = (): boolean => entity.enabled;

  const resilt = {
    ...AbstractWrapper(entity, WrapperType.Controls, params),
    update,
    enable,
    disable,
    isEnable,
    ...getOrbitControlsAccessors(entity),
    entity
  };

  applyOrbitControlsParams(resilt, params);
  resilt.enable();
  resilt.update();

  return resilt;
}
