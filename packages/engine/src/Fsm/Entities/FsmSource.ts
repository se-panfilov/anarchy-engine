import type { TFsmConfig, TFsmParams, TFsmSource } from '@Engine/Fsm/Models';
import { omitInObjectWithoutMutation } from '@Engine/Utils';
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
