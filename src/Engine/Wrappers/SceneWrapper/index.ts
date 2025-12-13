import { Scene } from 'three';
import type {
  ActorWrapper,
  CameraWrapper,
  IActorWrapper,
  ICameraWrapper,
  ILightWrapper,
  LightWrapper
} from '@Engine/Wrappers';
import { AbstractWrapper } from '@Engine/Wrappers';
import { getAccessors } from './Accessors';
import type { SceneParams } from '@Engine/Models/SceneParams';
import type { ISceneWrapper } from './ISceneWrapper';
import { Subject } from 'rxjs';

export function SceneWrapper({ name }: SceneParams): ISceneWrapper {
  const entity: Scene = new Scene();
  entity.name = name;

  const wrapper = AbstractWrapper(entity);

  const addActor$: Subject<IActorWrapper> = new Subject<ReturnType<typeof ActorWrapper>>();
  const addCamera$: Subject<ICameraWrapper> = new Subject<ReturnType<typeof CameraWrapper>>();
  const addLight$: Subject<ILightWrapper> = new Subject<ReturnType<typeof LightWrapper>>();

  const { addActor, addCamera, addLight } = getAccessors(entity);

  addActor$.subscribe(addActor);
  addCamera$.subscribe(addCamera);
  addLight$.subscribe(addLight);

  wrapper.destroyed$.subscribe(() => {
    wrapper.destroyed$.unsubscribe();
    addActor$.unsubscribe();
    addActor$.complete();
    addCamera$.unsubscribe();
    addCamera$.complete();
    addLight$.unsubscribe();
    addLight$.complete();
  });

  return { ...wrapper, addActor$, addCamera$, addLight$, entity };
}

export * from './ISceneWrapper';
