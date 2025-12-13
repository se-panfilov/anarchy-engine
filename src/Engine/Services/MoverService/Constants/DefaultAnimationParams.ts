import type { TAnimationParams } from '@/Engine/Services/MoverService/Models';

import { Easing } from './Easing';

export const defaultAnimationParams: Partial<TAnimationParams> = {
  delay: 0,
  direction: 'normal',
  easing: Easing.Linear,
  endDelay: 0,
  round: 0
};
