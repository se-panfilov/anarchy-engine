import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TFpsControlsParams, TFpsControlsWrapper } from '@/Engine/Controls/Models';
import { getFpsControlsAccessors } from '@/Engine/Controls/Wrappers/FpsControls/FpsControlsAccessors';
import { applyFpsControlsParams } from '@/Engine/Controls/Wrappers/FpsControls/FpsControlsWrapperHelper';
import type { TMilliseconds } from '@/Engine/Math';
import { withActiveMixin } from '@/Engine/Mixins';

export function FpsControlsWrapper(params: TFpsControlsParams): TFpsControlsWrapper {
  const entity: FirstPersonControls = new FirstPersonControls(params.camera.entity);

  const update = (delta: TMilliseconds): void => entity.update(delta);
  const getType = (): ControlsType => params.type;

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

  const result = {
    ...AbstractWrapper(entity, WrapperType.Controls, params),
    update,
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
  result.update(0);
  result._setActive(params.isActive, true);

  return result;
}
