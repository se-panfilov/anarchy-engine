import type { TWithSceneGetterService } from '@Anarchy/Engine/Mixins/Services/Models';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';

export function withSceneGetterService(scene: TSceneWrapper): TWithSceneGetterService {
  return {
    getScene: (): TSceneWrapper => scene
  };
}
