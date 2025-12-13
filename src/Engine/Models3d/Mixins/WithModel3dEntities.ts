import type { AnimationAction, AnimationClip, AnimationMixer } from 'three';

import type { TAnimationActions } from '@/Engine/Animations/Models';
import type { TModel3dEntities, TRawModel3d, TWithModel3dEntities } from '@/Engine/Models3d/Models';
import type { TWriteable } from '@/Engine/Utils';

export function withModel3dEntities(entities: TModel3dEntities): TWithModel3dEntities {
  const result = {
    ...entities,
    getRawModel3d: (): TRawModel3d => result.model3dSource,
    getAnimations: (): ReadonlyArray<AnimationClip> => result.animationsSource ?? [],
    setAnimations: (animations: ReadonlyArray<AnimationClip>): void => {
      // eslint-disable-next-line functional/immutable-data
      (result as TWriteable<TModel3dEntities>).animationsSource = [...animations];
    },
    addAnimations: (animations: ReadonlyArray<AnimationClip>): void => {
      // eslint-disable-next-line functional/immutable-data
      (result as TWriteable<TModel3dEntities>).animationsSource = [...(result.animationsSource ?? []), ...animations];
    },
    getMixer: (): AnimationMixer => result.mixer,
    setActions: (actions: TAnimationActions): void => {
      // eslint-disable-next-line functional/immutable-data
      (result as TWriteable<TModel3dEntities>).actions = actions;
    },
    addActions: (actions: TAnimationActions): void => {
      Object.entries(actions).forEach(([key, value]: [string, AnimationAction]): void => {
        // eslint-disable-next-line functional/immutable-data
        (result.actions as TWriteable<TAnimationActions>)[key as any] = value;
      });
    },
    getActions: (): TAnimationActions => result.actions
  };

  return result;
}
