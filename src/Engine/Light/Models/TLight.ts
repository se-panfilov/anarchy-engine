import type { TAmbientLight } from './TAmbientLight';
import type { TDirectionalLight } from './TDirectionalLight';
import type { THemisphereLight } from './THemisphereLight';
import type { TPointLight } from './TPointLight';
import type { TRectAreaLight } from './TRectAreaLight';
import type { TSpotLight } from './TSpotLight';

export type TLight = TAmbientLight | TDirectionalLight | TPointLight | THemisphereLight | TRectAreaLight | TSpotLight;
