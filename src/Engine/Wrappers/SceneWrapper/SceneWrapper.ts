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
import type { ISceneParams } from '@Engine/Models/ISceneParams';
import type { ISceneWrapper } from './Models';
import { Subject } from 'rxjs';

export function SceneWrapper({ name }: ISceneParams): ISceneWrapper {
  const entity: Scene = new Scene();

  // eslint-disable-next-line functional/immutable-data
  entity.name = name;

  const wrapper = AbstractWrapper(entity);

  const addActor$: Subject<IActorWrapper> = new Subject<ReturnType<typeof ActorWrapper>>();
  const addCamera$: Subject<ICameraWrapper> = new Subject<ReturnType<typeof CameraWrapper>>();
  const addLight$: Subject<ILightWrapper> = new Subject<ReturnType<typeof LightWrapper>>();

  const { addActor, addCamera, addLight } = getAccessors(entity);

  addActor$.subscribe(addActor);
  addCamera$.subscribe(addCamera);
  addLight$.subscribe(addLight);

  wrapper.destroy$.subscribe(() => {
    wrapper.destroy$.unsubscribe();
    addActor$.unsubscribe();
    addActor$.complete();
    addCamera$.unsubscribe();
    addCamera$.complete();
    addLight$.unsubscribe();
    addLight$.complete();
  });

  return { ...wrapper, addActor$, addCamera$, addLight$, entity };
}
