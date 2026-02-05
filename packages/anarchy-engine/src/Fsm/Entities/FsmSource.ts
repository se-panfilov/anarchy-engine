import type { TFsmConfig, TFsmParams, TFsmSource } from '@hellpig/anarchy-engine/Fsm/Models';
import { omitInObjectWithoutMutation } from '@hellpig/anarchy-shared/Utils';
import { nanoid } from 'nanoid';

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
