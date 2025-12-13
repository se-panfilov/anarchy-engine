import type { TAmbientLightProps } from './TAmbientLightProps';
import type { TDirectionalLightProps } from './TDirectionalLightProps';
import type { THemisphereLightProps } from './THemisphereLightProps';
import type { TPointLightProps } from './TPointLightProps';
import type { TRectAreaLightProps } from './TRectAreaLightProps';
import type { TSpotLightProps } from './TSpotLightProps';

export type TAnyLightProps = TAmbientLightProps | THemisphereLightProps | TDirectionalLightProps | TPointLightProps | TRectAreaLightProps | TSpotLightProps;
