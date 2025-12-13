import type { IActorWrapper } from '@Engine/Domains/Actor';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { ILightWrapper } from '@Engine/Domains/Light';
import type { IScene, ISceneObject } from '@Engine/Domains/Scene';
import type { IWrapper } from '@Engine/Models';

export type ISceneWrapper = IWrapper<IScene> &
  Readonly<{
    add: (obj: ISceneObject) => void;
    addActor: (actor: Readonly<IActorWrapper>) => void;
    addCamera: (camera: Readonly<ICameraWrapper>) => void;
    addLight: (light: Readonly<ILightWrapper>) => void;
  }>;
