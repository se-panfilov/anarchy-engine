import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { IColor } from '@/Engine/Domains/Color';
import type { IDataTexture } from '@/Engine/Domains/EnvMap';
import type { ILightWrapper } from '@/Engine/Domains/Light';
import type { ITextAnyWrapper } from '@/Engine/Domains/Text';
import type { ICubeTexture, ITexture } from '@/Engine/Domains/Texture';

import type { ISceneObject } from './ISceneObject';

export type ISceneAccessors = Readonly<{
  add: (obj: ISceneObject) => void;
  addActor: (actor: Readonly<IActorWrapper>) => void;
  addCamera: (camera: Readonly<ICameraWrapper>) => void;
  addLight: (light: Readonly<ILightWrapper>) => void;
  addText: (text: Readonly<ITextAnyWrapper>) => void;
  setBackground: (color: string | IColor | ITexture | ICubeTexture | IDataTexture) => void;
  getBackground: () => string | IColor | ITexture | ICubeTexture | IDataTexture | null;
  setEnvironmentMap: (envMap: IDataTexture | ITexture) => void;
  getEnvironmentMap: () => ITexture | null;
}>;
