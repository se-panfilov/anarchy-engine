import type { TObject3DParams } from '@Engine/ThreeLib';

import type { TAudioParams } from './TAudioParams';

export type TAudioConfig = Omit<TAudioParams, 'audioSource' | 'listener'> &
  Readonly<{
    audioSource: string;
    listener?: string;
  }> &
  Omit<TObject3DParams, keyof TObject3DParams>;
