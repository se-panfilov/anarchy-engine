import type { TColor } from '@/Engine/Color';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TSceneConfig, TSceneWrapper } from '@/Engine/Scene/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function sceneToConfig(entity: TSceneWrapper): TSceneConfig {
  return filterOutEmptyFields({
    // TODO we cannot serialize other backgrounds than Color at the moment
    background: (entity.getBackground() as TColor).getHexString(),
    isActive: entity.isActive(),
    ...extractSerializableRegistrableFields(entity)
  });
}
