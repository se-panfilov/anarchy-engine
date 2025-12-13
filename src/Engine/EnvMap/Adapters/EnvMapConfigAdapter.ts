import type { TEnvMapConfigPack, TEnvMapParamsPack } from '@/Engine/EnvMap/Models';

export const configToParams = (config: TEnvMapConfigPack): TEnvMapParamsPack | never => ({ ...config });
