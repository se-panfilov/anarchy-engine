import type { TEnvMap } from './TEnvMap';
import type { TEnvMapParams } from './TEnvMapParams';

export type TEnvMapParamsPack = TEnvMapParams & Readonly<{ texture: TEnvMap }>;
