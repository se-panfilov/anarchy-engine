import type { IActorWrapper } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IColor } from '@/Engine/Color';
import type { IDataTexture } from '@/Engine/EnvMap';
import type { ILightWrapper } from '@/Engine/Light';
import type { ITextAnyWrapper } from '@/Engine/Text';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';

import type { ISceneObject } from './ISceneObject';

export type ISceneAccessors = Readonly<{
  add: (obj: ISceneObject) => void;
  addActor: (actor: Readonly<IActorWrapperAsync>) => void;
  addCamera: (camera: Readonly<ICameraWrapper>) => void;
  addLight: (light: Readonly<ILightWrapper>) => void;
  addText: (text: Readonly<ITextAnyWrapper>) => void;
  setBackground: (color: string | IColor | ITexture | ICubeTexture | IDataTexture) => void;
  getBackground: () => string | IColor | ITexture | ICubeTexture | IDataTexture | null;
  setEnvironmentMap: (envMap: IDataTexture | ITexture) => void;
  getEnvironmentMap: () => ITexture | null;
}>;
