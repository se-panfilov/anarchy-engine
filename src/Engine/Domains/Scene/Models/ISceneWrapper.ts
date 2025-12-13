import type { ISceneObject, IScene } from '@Engine/Domains/Scene/Models';
import type { IWrapper } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Domains/Actor/Models';
import type { ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { ILightWrapper } from '@Engine/Domains/Light/Models';

export type ISceneWrapper = IWrapper<IScene> &
  Readonly<{
    add: (obj: ISceneObject) => void;
    addActor: (actor: Readonly<IActorWrapper>) => void;
    addCamera: (camera: Readonly<ICameraWrapper>) => void;
    addLight: (light: Readonly<ILightWrapper>) => void;
  }>;
