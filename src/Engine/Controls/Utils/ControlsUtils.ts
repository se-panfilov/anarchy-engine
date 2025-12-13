import { ControlsType } from '@/Engine/Controls/Constants';
import type { TControlsWrapper, TFpsControlsWrapper, TOrbitControlsWrapper } from '@/Engine/Controls/Models';

export const isOrbitControls = (controls: TOrbitControlsWrapper | TControlsWrapper): controls is TOrbitControlsWrapper => controls.getType() === ControlsType.OrbitControls;
export const isFpsControls = (controls: TFpsControlsWrapper | TControlsWrapper): controls is TFpsControlsWrapper => controls.getType() === ControlsType.FirstPersonControls;
