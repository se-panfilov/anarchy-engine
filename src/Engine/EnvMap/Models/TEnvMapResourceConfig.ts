import type { AnyMapping } from 'three';

import type { TAbstractResourceConfig } from '@/Engine/Abstract';

export type TEnvMapResourceConfig = TAbstractResourceConfig &
  Readonly<{
    mapping?: AnyMapping;
  }>;
