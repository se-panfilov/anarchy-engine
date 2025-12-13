import type { IWithCoordsXYZ } from '@/Engine/Mixins';

import type { ITextParams } from './ITextParams';

export type ITextConfig = Omit<ITextParams, 'position'> &
  Readonly<{
    color: string;
    intensity: number;
    position: IWithCoordsXYZ;
  }>;
