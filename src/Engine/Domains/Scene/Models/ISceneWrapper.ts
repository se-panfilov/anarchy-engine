import type { Scene } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { ILightWrapper } from '@/Engine/Domains/Light';
import type { SceneTag } from '@/Engine/Domains/Scene';
import type { ITextWrapper } from '@/Engine/Domains/Text';
import type { IWithTags } from '@/Engine/Mixins';
import type { IColor, ICubeTexture, ITexture } from '@/Engine/Wrappers';

import type { ISceneObject } from './ISceneObject';

export type ISceneWrapper = IWrapper<Scene> &
  Readonly<{
    add: (obj: ISceneObject) => void;
    addActor: (actor: Readonly<IActorWrapper>) => void;
    addCamera: (camera: Readonly<ICameraWrapper>) => void;
    addLight: (light: Readonly<ILightWrapper>) => void;
    addText: (text: Readonly<ITextWrapper>) => void;
    setBackground: (color: string) => void;
    getBackground: () => IColor | ITexture | ICubeTexture | null;
  }> &
  IWithTags<SceneTag>;
