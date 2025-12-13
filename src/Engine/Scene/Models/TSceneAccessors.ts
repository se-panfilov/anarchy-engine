import type { CubeTexture, Group, Mesh, Object3D } from 'three';

import type { TActorWrapper } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TColor } from '@/Engine/Color';
import type { TEnvMapTexture } from '@/Engine/EnvMap';
import type { TFogWrapper } from '@/Engine/Fog';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light';
import type { TParticlesWrapperAsync } from '@/Engine/Particles';
import type { TTextAnyWrapper } from '@/Engine/Text';
import type { TTexture } from '@/Engine/Texture';

export type TSceneAccessors = Readonly<{
  addActor: (actor: Readonly<TActorWrapper>) => void;
  addCamera: (camera: Readonly<TCameraWrapper>) => void;
  addLight: <T extends TLight>(light: Readonly<TAbstractLightWrapper<T>>) => void;
  setFog: (fog: Readonly<TFogWrapper>) => void;
  addText: (text: Readonly<TTextAnyWrapper>) => void;
  addModel: (mesh: Group | Mesh | Object3D) => void;
  addParticles: (text: Readonly<TParticlesWrapperAsync>) => void;
  setBackground: (color: string | TColor | TTexture | CubeTexture | TEnvMapTexture) => void;
  getBackground: () => string | TColor | TTexture | CubeTexture | TEnvMapTexture | null;
  setEnvironmentMap: (envMap: TEnvMapTexture | TTexture) => void;
  getEnvironmentMap: () => TTexture | null;
}>;
