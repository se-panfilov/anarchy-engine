import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IColor } from '@/Engine/Color';
import type { IDataTexture } from '@/Engine/EnvMap';
import type { IFogWrapper } from '@/Engine/Fog';
import type { IAbstractLightWrapper, ILight } from '@/Engine/Light';
import type { IParticlesWrapperAsync } from '@/Engine/Particles';
import type { ITextAnyWrapper } from '@/Engine/Text';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';

export type ISceneAccessors = Readonly<{
  addActor: (actor: Readonly<TActorWrapperAsync>) => void;
  addCamera: (camera: Readonly<ICameraWrapper>) => void;
  addLight: <T extends ILight>(light: Readonly<IAbstractLightWrapper<T>>) => void;
  setFog: (fog: Readonly<IFogWrapper>) => void;
  addText: (text: Readonly<ITextAnyWrapper>) => void;
  addParticles: (text: Readonly<IParticlesWrapperAsync>) => void;
  setBackground: (color: string | IColor | ITexture | ICubeTexture | IDataTexture) => void;
  getBackground: () => string | IColor | ITexture | ICubeTexture | IDataTexture | null;
  setEnvironmentMap: (envMap: IDataTexture | ITexture) => void;
  getEnvironmentMap: () => ITexture | null;
}>;
