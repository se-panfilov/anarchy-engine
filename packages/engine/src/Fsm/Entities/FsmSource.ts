import { nanoid } from 'nanoid';

import type { TFsmConfig, TFsmParams, TFsmSource } from '@/Fsm/Models';
import { omitInObjectWithoutMutation } from '@/Utils';

export function FsmSource(params: TFsmParams): TFsmSource {
  const id: string = params.type + '_fsm_' + nanoid();

  const result = {
    id,
    ...params,
    tags: params.tags || [],
    serialize: (): TFsmConfig => omitInObjectWithoutMutation(result, ['id', 'tags', 'serialize'])
  };

  return result;
}
