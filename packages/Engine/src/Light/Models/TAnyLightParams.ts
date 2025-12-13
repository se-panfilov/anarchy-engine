import type { TAmbientLightParams } from './TAmbientLightParams';
import type { TDirectionalLightParams } from './TDirectionalLightParams';
import type { THemisphereLightParams } from './THemisphereLightParams';
import type { TPointLightParams } from './TPointLightParams';
import type { TRectAreaLightParams } from './TRectAreaLightParams';
import type { TSpotLightParams } from './TSpotLightParams';

export type TAnyLightParams = TAmbientLightParams | THemisphereLightParams | TDirectionalLightParams | TPointLightParams | TRectAreaLightParams | TSpotLightParams;
