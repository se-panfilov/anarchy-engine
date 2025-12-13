import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TColor } from '@/Engine/Color';
import type { TDataTexture } from '@/Engine/EnvMap';
import type { IFogWrapper } from '@/Engine/Fog';
import type { IAbstractLightWrapper, ILight } from '@/Engine/Light';
import type { IParticlesWrapperAsync } from '@/Engine/Particles';
import type { ITextAnyWrapper } from '@/Engine/Text';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';

export type ISceneAccessors = Readonly<{
  addActor: (actor: Readonly<TActorWrapperAsync>) => void;
  addCamera: (camera: Readonly<TCameraWrapper>) => void;
  addLight: <T extends ILight>(light: Readonly<IAbstractLightWrapper<T>>) => void;
  setFog: (fog: Readonly<IFogWrapper>) => void;
  addText: (text: Readonly<ITextAnyWrapper>) => void;
  addParticles: (text: Readonly<IParticlesWrapperAsync>) => void;
  setBackground: (color: string | TColor | ITexture | ICubeTexture | TDataTexture) => void;
  getBackground: () => string | TColor | ITexture | ICubeTexture | TDataTexture | null;
  setEnvironmentMap: (envMap: TDataTexture | ITexture) => void;
  getEnvironmentMap: () => ITexture | null;
}>;
