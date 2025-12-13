import { nanoid } from 'nanoid';

import type { TFsmParams, TFsmSource } from '@/Engine/Fsm/Models';

export function FsmSource(params: TFsmParams): TFsmSource {
  const id: string = params.type + '_fsm_' + nanoid();

  return {
    id,
    ...params,
    tags: params.tags || []
  };
}
