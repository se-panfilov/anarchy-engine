import type { TColor } from '@/Engine/Color';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TSceneConfig, TSceneWrapper } from '@/Engine/Scene/Models';
import { filterOutEmptyFields, isDefined } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function sceneToConfig(entity: TSceneWrapper): TSceneConfig {
  const background: TColor | undefined = entity.getBackground() as TColor | undefined;
  // TODO we cannot serialize other backgrounds than Color at the moment
  const hexString: string | undefined = isDefined(background) ? '#' + background.getHexString() : undefined;

  return filterOutEmptyFields({
    background: hexString,
    isActive: entity.isActive(),
    ...extractSerializableRegistrableFields(entity)
  });
}
