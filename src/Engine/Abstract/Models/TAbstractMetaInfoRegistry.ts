import type { TAbstractResourceConfig } from './TAbstractResourceConfig';
import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

export type TAbstractMetaInfoRegistry<RC extends TAbstractResourceConfig> = TAbstractSimpleRegistry<RC>;
