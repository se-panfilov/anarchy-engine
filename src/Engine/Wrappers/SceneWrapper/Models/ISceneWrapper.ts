import type { AbstractWrapper, ActorWrapper, CameraWrapper, LightWrapper } from '@Engine/Wrappers';
import type { Scene } from 'three';
import type { Subject } from 'rxjs';

export type ISceneWrapper = ReturnType<typeof AbstractWrapper<Scene>> & {
  readonly addActor$: Subject<ReturnType<typeof ActorWrapper>>;
  readonly addCamera$: Subject<ReturnType<typeof CameraWrapper>>;
  readonly addLight$: Subject<ReturnType<typeof LightWrapper>>;
};
