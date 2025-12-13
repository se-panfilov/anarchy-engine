import type { IActorWrapper, ICameraWrapper, ILightWrapper } from '@Engine/Wrappers';
import type { ISceneObject, IWrapper } from '@Engine/Models';
import type { Scene } from 'three';

export type ISceneWrapper = IWrapper<Scene> &
  Readonly<{
    add: (obj: ISceneObject) => void;
    addActor: (actor: IActorWrapper) => void;
    addCamera: (camera: ICameraWrapper) => void;
    addLight: (light: ILightWrapper) => void;
  }>;
