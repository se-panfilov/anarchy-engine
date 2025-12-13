import type { CubeTexture } from 'three';

import type { TActor } from '@/Engine/Actor';
import type { TAnyCameraWrapper } from '@/Engine/Camera';
import type { TColor } from '@/Engine/Color';
import type { TEnvMapTexture } from '@/Engine/EnvMap';
import type { TFogWrapper } from '@/Engine/Fog';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light';
import type { TModel3d } from '@/Engine/Models3d';
import type { TParticlesWrapper } from '@/Engine/Particles';
import type { TTextAnyWrapper } from '@/Engine/Text';
import type { TTexture } from '@/Engine/Texture';

export type TSceneAccessors = Readonly<{
  addCamera: (camera: Readonly<TAnyCameraWrapper>) => void;
  addLight: <T extends TLight>(light: Readonly<TAbstractLightWrapper<T>>) => void;
  setFog: (fog: Readonly<TFogWrapper>) => void;
  addText: (text: Readonly<TTextAnyWrapper>) => void;
  addModel3d: (model: TModel3d) => void;
  addActor: (actor: TActor) => void;
  addParticles: (text: Readonly<TParticlesWrapper>) => void;
  setBackground: (color: string | TColor | TTexture | CubeTexture | TEnvMapTexture) => void;
  getBackground: () => string | TColor | TTexture | CubeTexture | TEnvMapTexture | null;
  setEnvironmentMap: (envMap: TEnvMapTexture | TTexture) => void;
  getEnvironmentMap: () => TTexture | null;
}>;
