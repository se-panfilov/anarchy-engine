import type { IActorWrapper, ICameraWrapper, ILightWrapper } from '@Engine/Wrappers';
import type { Scene } from 'three';
import type { IWrapper } from '@Engine/Models';

export type ISceneWrapper = IWrapper<Scene> &
  Readonly<{
    addActor: (actor: IActorWrapper) => void;
    addCamera: (camera: ICameraWrapper) => void;
    addLight: (light: ILightWrapper) => void;
  }>;
