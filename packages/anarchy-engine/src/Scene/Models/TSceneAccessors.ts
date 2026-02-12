import type { TActor } from '@Anarchy/Engine/Actor';
import type { TAnyCameraWrapper } from '@Anarchy/Engine/Camera';
import type { TColor } from '@Anarchy/Engine/Color';
import type { TEnvMapTexture } from '@Anarchy/Engine/EnvMap';
import type { TFogWrapper } from '@Anarchy/Engine/Fog';
import type { TAbstractLightWrapper, TAnyLight } from '@Anarchy/Engine/Light';
import type { TModel3d } from '@Anarchy/Engine/Models3d';
import type { TParticlesWrapper } from '@Anarchy/Engine/Particles';
import type { TTextAnyWrapper } from '@Anarchy/Engine/Text';
import type { TTexture } from '@Anarchy/Engine/Texture';
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
