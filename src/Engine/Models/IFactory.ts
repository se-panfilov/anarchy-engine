import type { IAbstractConfig } from '@Engine/Launcher/Models';
import type { IWrapper } from '@Engine/Models';

export interface IFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> {
  readonly id: string;
  readonly type: string;
  readonly create: (params: PRMS) => T;
  readonly fromConfig: (config: C) => T; // TODO (S.Panfilov) extract fromConfig as a HOC maybe?
}
