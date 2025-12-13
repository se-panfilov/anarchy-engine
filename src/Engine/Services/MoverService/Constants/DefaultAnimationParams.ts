import type { IAnimationParams } from '@/Engine/Services/MoverService/Models';

import { Easing } from './Easing';

export const defaultAnimationParams: Partial<IAnimationParams> = {
  direction: 'normal',
  round: 0,
  delay: 0,
  endDelay: 0,
  easing: Easing.Linear
};
