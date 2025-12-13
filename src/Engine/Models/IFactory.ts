import type { IWrapper } from '@Engine/Models';
import type { IAbstractConfig } from '@Engine/SceneLauncher/Models';

export type IFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = Readonly<{
  id: string;
  type: string;
  create: (params: PRMS) => T;
  fromConfig: (config: C) => T; // TODO (S.Panfilov) extract fromConfig as a HOC maybe?
}>;
