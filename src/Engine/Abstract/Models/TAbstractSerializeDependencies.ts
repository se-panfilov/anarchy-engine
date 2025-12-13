import type { TAbstractMetaInfoRegistry } from './TAbstractMetaInfoRegistry';
import type { TAbstractResourceConfig } from './TAbstractResourceConfig';

export type TAbstractSerializeDependencies<C extends TAbstractResourceConfig> = Readonly<{ metaInfoRegistry: TAbstractMetaInfoRegistry<C> }>;
