import type { TAmbientLightWrapper } from './TAmbientLightWrapper';
import type { TDirectionalLightWrapper } from './TDirectionalLightWrapper';
import type { THemisphereLightWrapper } from './THemisphereLightWrapper';
import type { TPointLightWrapper } from './TPointLightWrapper';
import type { TRectAreaLightWrapper } from './TRectAreaLightWrapper';
import type { TSpotLightWrapper } from './TSpotLightWrapper';

export type TLightWrapper = TAmbientLightWrapper | TDirectionalLightWrapper | TPointLightWrapper | THemisphereLightWrapper | TRectAreaLightWrapper | TSpotLightWrapper;
