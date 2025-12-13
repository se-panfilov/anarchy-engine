import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TAudioBasicParams } from './TAudioBasicParams';

export type TAudioBasicConfig = Omit<TAudioBasicParams, 'audioSource' | 'listener'> &
  Readonly<{
    audioSource: string;
    listener: string;
  }> &
  Omit<TObject3DParams, keyof TObject3DParams> &
  Pick<TObject3DPropConfig, 'position'>;
