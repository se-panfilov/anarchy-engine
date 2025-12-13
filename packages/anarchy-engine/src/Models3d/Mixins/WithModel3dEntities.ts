import type { TAnimationActions } from '@Anarchy/Engine/Animations/Models';
import type { TModel3dEntities, TRawModel3d, TWithModel3dEntities } from '@Anarchy/Engine/Models3d/Models';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { AnimationAction, AnimationClip, AnimationMixer } from 'three';

export function withModel3dEntities(entities: TModel3dEntities): TWithModel3dEntities {
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(entities, {
    getRawModel3d: (): TRawModel3d => entities.model3dSource,
    getActiveAnimationAction: (): AnimationAction | undefined => {
      const allActions = entities.animationsSource?.map((clip) => entities.mixer.clipAction(clip));
      return allActions?.find((action) => action.isRunning());
    },
    getAnimations: (): ReadonlyArray<AnimationClip> => entities.animationsSource ?? [],
    setAnimations: (animations: ReadonlyArray<AnimationClip>): void => {
      // eslint-disable-next-line functional/immutable-data
      (entities as TWriteable<TModel3dEntities>).animationsSource = [...animations];
    },
    addAnimations: (animations: ReadonlyArray<AnimationClip>): void => {
      if (isNotDefined((entities as TWriteable<TModel3dEntities>).animationsSource)) {
        // eslint-disable-next-line functional/immutable-data
        return void ((entities as TWriteable<TModel3dEntities>).animationsSource = [...animations]);
      }

      // eslint-disable-next-line functional/immutable-data
      return void ((entities as TWriteable<TModel3dEntities>).animationsSource as Array<AnimationClip>).push(...animations);
    },
    getMixer: (): AnimationMixer => entities.mixer,
    setActions: (actions: TAnimationActions): void => {
      // eslint-disable-next-line functional/immutable-data
      (entities as TWriteable<TModel3dEntities>).actions = actions;
    },
    addActions: (actions: TAnimationActions): void => {
      Object.entries(actions).forEach(([key, value]: [string, AnimationAction]): void => {
        // eslint-disable-next-line functional/immutable-data
        (entities.actions as TWriteable<TAnimationActions>)[key as any] = value;
      });
    },
    getActions: (): TAnimationActions => entities.actions
  });
}
