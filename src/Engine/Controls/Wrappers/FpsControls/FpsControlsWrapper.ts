import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { controlsToConfig } from '@/Engine/Controls/Adapters';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TControlsServiceDependencies, TFpsControlsConfig, TFpsControlsParams, TFpsControlsWrapper } from '@/Engine/Controls/Models';
import { getFpsControlsAccessors } from '@/Engine/Controls/Wrappers/FpsControls/FpsControlsAccessors';
import { applyFpsControlsParams } from '@/Engine/Controls/Wrappers/FpsControls/FpsControlsWrapperHelper';
import type { TMilliseconds } from '@/Engine/Math';
import { withActiveMixin } from '@/Engine/Mixins';

export function FpsControlsWrapper(params: TFpsControlsParams): TFpsControlsWrapper {
  const entity: FirstPersonControls = new FirstPersonControls(params.camera.entity, params.canvas);

  const update = (delta: TMilliseconds): void => entity.update(delta);
  const getType = (): ControlsType => params.type;

  // TODO - add pointer lock
  // params.canvas.addEventListener('click', () => {
  //   params.canvas.requestPointerLock();
  // });

  function enable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = true;
    update(0);
  }

  function disable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = false;
    update(0);
  }

  const isEnable = (): boolean => entity.enabled;

  const result = Object.assign(AbstractWrapper(entity, WrapperType.Controls, { name: params.name, tags: params.tags }), {
    update,
    enable,
    disable,
    isEnable,
    getType,
    ...getFpsControlsAccessors(entity),
    ...withActiveMixin(),
    entity,
    // TODO 15-0-0: add serializer to the service to avoid dependencies passing
    serialize: (dependencies: TControlsServiceDependencies): TFpsControlsConfig => controlsToConfig(result, dependencies) as TFpsControlsConfig
  });

  applyFpsControlsParams(result, params.options);
  result.enable();
  result.update(0);
  result._setActive(params.isActive, true);

  return result;
}
