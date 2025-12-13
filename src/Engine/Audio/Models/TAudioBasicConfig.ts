import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TAudioBasicParams } from './TAudioBasicParams';

export type TAudioBasicConfig = Omit<TAudioBasicParams, 'audioSource'> &
  Readonly<{
    audioSource: string;
  }> &
  Omit<TObject3DParams, keyof TObject3DParams> &
  Pick<TObject3DPropConfig, 'position'>;
