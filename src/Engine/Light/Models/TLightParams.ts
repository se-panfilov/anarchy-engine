import type { TAmbientLightParams } from './TAmbientLightParams';
import type { TDirectionalLightParams } from './TDirectionalLightParams';
import type { THemisphereLightParams } from './THemisphereLightParams';
import type { TPointLightParams } from './TPointLightParams';
import type { TSpotLightParams } from './TSpotLightParams';

export type TLightParams = TAmbientLightParams | TDirectionalLightParams | TPointLightParams | THemisphereLightParams | TSpotLightParams;
