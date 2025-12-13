import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TFpsControlsParams, TFpsControlsWrapper } from '@/Engine/Controls/Models';
import { getFpsControlsAccessors } from '@/Engine/Controls/Wrappers/FpsControls/FpsControlsAccessors';
import { applyFpsControlsParams } from '@/Engine/Controls/Wrappers/FpsControls/FpsControlsWrapperHelper';
import { withActiveMixin } from '@/Engine/Mixins';

export function FpsControlsWrapper(params: TFpsControlsParams): TFpsControlsWrapper {
  const entity: FirstPersonControls = new FirstPersonControls(params.camera.entity);

  const getType = (): ControlsType => params.type;

  function enable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = true;
  }

  function disable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = false;
  }

  const isEnable = (): boolean => entity.enabled;

  const result = {
    ...AbstractWrapper(entity, WrapperType.Controls, params),
    enable,
    disable,
    isEnable,
    getType,
    ...getFpsControlsAccessors(entity),
    ...withActiveMixin(),
    entity
  };

  applyFpsControlsParams(result, params);
  result.enable();
  result._setActive(params.isActive, true);

  return result;
}
