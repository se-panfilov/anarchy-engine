import type { Group, Mesh } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TColor } from '@/Engine/Color';
import type { TDataTexture } from '@/Engine/EnvMap';
import type { TFogWrapper } from '@/Engine/Fog';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light';
import type { TParticlesWrapperAsync } from '@/Engine/Particles';
import type { TTextAnyWrapper } from '@/Engine/Text';
import type { TCubeTexture, TTexture } from '@/Engine/Texture';

export type TSceneAccessors = Readonly<{
  addActor: (actor: Readonly<TActorWrapperAsync>) => void;
  addCamera: (camera: Readonly<TCameraWrapper>) => void;
  addLight: <T extends TLight>(light: Readonly<TAbstractLightWrapper<T>>) => void;
  setFog: (fog: Readonly<TFogWrapper>) => void;
  addText: (text: Readonly<TTextAnyWrapper>) => void;
  addModel: (mesh: Mesh | Group) => void;
  addParticles: (text: Readonly<TParticlesWrapperAsync>) => void;
  setBackground: (color: string | TColor | TTexture | TCubeTexture | TDataTexture) => void;
  getBackground: () => string | TColor | TTexture | TCubeTexture | TDataTexture | null;
  setEnvironmentMap: (envMap: TDataTexture | TTexture) => void;
  getEnvironmentMap: () => TTexture | null;
}>;
