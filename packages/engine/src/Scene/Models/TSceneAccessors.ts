import type { CubeTexture } from 'three';

import type { TActor } from '@/Actor';
import type { TAnyCameraWrapper } from '@/Camera';
import type { TColor } from '@/Color';
import type { TEnvMapTexture } from '@/EnvMap';
import type { TFogWrapper } from '@/Fog';
import type { TAbstractLightWrapper, TAnyLight } from '@/Light';
import type { TModel3d } from '@/Models3d';
import type { TParticlesWrapper } from '@/Particles';
import type { TTextAnyWrapper } from '@/Text';
import type { TTexture } from '@/Texture';

export type TSceneAccessors = Readonly<{
  addCamera: (camera: Readonly<TAnyCameraWrapper>) => void;
  addLight: <T extends TAnyLight>(light: Readonly<TAbstractLightWrapper<T>>) => void;
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
