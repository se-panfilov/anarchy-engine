import type { TWithSceneGetterService } from '@/Mixins/Services/Models';
import type { TSceneWrapper } from '@/Scene';

export function withSceneGetterService(scene: TSceneWrapper): TWithSceneGetterService {
  return {
    getScene: (): TSceneWrapper => scene
  };
}
