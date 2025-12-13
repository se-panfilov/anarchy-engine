import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TAudioBasicParams } from './TAudioBasicParams';

export type TAudio3dParams = TAudioBasicParams &
  Readonly<{
    position: TReadonlyVector3;
  }>;
