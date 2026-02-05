import type { TActor } from '@hellpig/anarchy-engine/Actor';
import type { TAnyCameraWrapper } from '@hellpig/anarchy-engine/Camera';
import type { TColor } from '@hellpig/anarchy-engine/Color';
import type { TEnvMapTexture } from '@hellpig/anarchy-engine/EnvMap';
import type { TFogWrapper } from '@hellpig/anarchy-engine/Fog';
import type { TAbstractLightWrapper, TAnyLight } from '@hellpig/anarchy-engine/Light';
import type { TModel3d } from '@hellpig/anarchy-engine/Models3d';
import type { TParticlesWrapper } from '@hellpig/anarchy-engine/Particles';
import type { TTextAnyWrapper } from '@hellpig/anarchy-engine/Text';
import type { TTexture } from '@hellpig/anarchy-engine/Texture';
import type { CubeTexture } from 'three';

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
