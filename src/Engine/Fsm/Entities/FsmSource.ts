import { nanoid } from 'nanoid';

import type { TFsmParams, TFsmSource } from '@/Engine/Fsm/Models';
import { withTagsMixin } from '@/Engine/Mixins';

export function FsmSource(params: TFsmParams): TFsmSource {
  const id: string = params.type + '_fsm_' + nanoid();

  return {
    id,
    ...params,
    ...withTagsMixin(params.tags)
  };
}
