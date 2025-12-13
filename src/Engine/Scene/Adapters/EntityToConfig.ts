import type { SceneJSON } from 'three';

import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TSceneConfig, TSceneWrapper } from '@/Engine/Scene/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function sceneToConfig(entity: TSceneWrapper): TSceneConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  const json: SceneJSON = entity.entity.toJSON().object;

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
