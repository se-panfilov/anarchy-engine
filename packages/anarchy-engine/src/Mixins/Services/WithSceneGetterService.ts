import type { TWithSceneGetterService } from '@hellpig/anarchy-engine/Mixins/Services/Models';
import type { TSceneWrapper } from '@hellpig/anarchy-engine/Scene';

export function withSceneGetterService(scene: TSceneWrapper): TWithSceneGetterService {
  return {
    getScene: (): TSceneWrapper => scene
  };
}
