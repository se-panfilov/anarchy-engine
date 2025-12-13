import type { TFpsControlsParamsOptions, TFpsControlsWrapper } from '@Anarchy/Engine/Controls/Models';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';

export function applyFpsControlsParams(wrapper: TFpsControlsWrapper, params: TFpsControlsParamsOptions | undefined): void {
  if (isNotDefined(params)) return;

  if (isDefined(params.movementSpeed)) wrapper.setMovementSpeed(params.movementSpeed);
  if (isDefined(params.lookSpeed)) wrapper.setLookSpeed(params.lookSpeed);
  if (isDefined(params.lookVertical)) wrapper.setLookVertical(params.lookVertical);
  if (isDefined(params.autoForward)) wrapper.setAutoForward(params.autoForward);
  if (isDefined(params.activeLook)) wrapper.setActiveLook(params.activeLook);
  if (isDefined(params.heightSpeed)) wrapper.setHeightSpeed(params.heightSpeed);
  if (isDefined(params.heightCoef)) wrapper.setHeightCoef(params.heightCoef);
  if (isDefined(params.heightMin)) wrapper.setHeightMin(params.heightMin);
  if (isDefined(params.heightMax)) wrapper.setHeightMax(params.heightMax);
  if (isDefined(params.constrainVertical)) wrapper.setConstrainVertical(params.constrainVertical);
  if (isDefined(params.verticalMin)) wrapper.setVerticalMin(params.verticalMin);
  if (isDefined(params.verticalMax)) wrapper.setVerticalMax(params.verticalMax);
  if (isDefined(params.mouseDragOn)) wrapper.setMouseDragOn(params.mouseDragOn);
}
