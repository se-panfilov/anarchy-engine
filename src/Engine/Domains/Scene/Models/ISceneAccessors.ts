import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { ILightWrapper } from '@/Engine/Domains/Light';
import type { IText2dWrapper } from '@/Engine/Domains/Text';
import type { ITexture } from '@/Engine/Domains/Texture';
import type { IColor, ICubeTexture } from '@/Engine/Wrappers';

import type { ISceneObject } from './ISceneObject';

export type ISceneAccessors = Readonly<{
  add: (obj: ISceneObject) => void;
  addActor: (actor: Readonly<IActorWrapper>) => void;
  addCamera: (camera: Readonly<ICameraWrapper>) => void;
  addLight: (light: Readonly<ILightWrapper>) => void;
  addText: (text: Readonly<IText2dWrapper>) => void;
  setBackground: (color: string) => void;
  getBackground: () => IColor | ITexture | ICubeTexture | null;
}>;
