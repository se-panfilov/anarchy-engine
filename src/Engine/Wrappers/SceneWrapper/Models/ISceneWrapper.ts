import type { IScene, ISceneObject, IWrapper } from '@Engine/Models';
import type { IActorWrapper, ICameraWrapper, ILightWrapper } from '@Engine/Wrappers';

export type ISceneWrapper = IWrapper<IScene> &
  Readonly<{
    add: (obj: ISceneObject) => void;
    addActor: (actor: IActorWrapper) => void;
    addCamera: (camera: ICameraWrapper) => void;
    addLight: (light: ILightWrapper) => void;
  }>;
