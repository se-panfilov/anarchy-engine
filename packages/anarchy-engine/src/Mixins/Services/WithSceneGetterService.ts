import type { TWithSceneGetterService } from '@Engine/Mixins/Services/Models';
import type { TSceneWrapper } from '@Engine/Scene';

export function withSceneGetterService(scene: TSceneWrapper): TWithSceneGetterService {
  return {
    getScene: (): TSceneWrapper => scene
  };
}
