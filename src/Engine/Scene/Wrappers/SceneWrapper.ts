import { Scene } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorWrapper } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TColor } from '@/Engine/Color';
import { ColorWrapper } from '@/Engine/Color';
import type { TEnvMapTexture } from '@/Engine/EnvMap';
import type { TFogWrapper } from '@/Engine/Fog';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { TParticlesWrapperAsync } from '@/Engine/Particles';
import type { TSceneObject, TSceneParams, TSceneWrapper } from '@/Engine/Scene/Models';
import type { TTextAnyWrapper } from '@/Engine/Text';
import type { TCubeTexture, TTexture } from '@/Engine/Texture';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, isString } from '@/Engine/Utils';

export function SceneWrapper(params: TSceneParams): TSceneWrapper {
  const entity: TWriteable<Scene> = new Scene();

  if (isDefined(params.background)) setBackground(params.background);

  const wrapper: TWrapper<Scene> = AbstractWrapper(entity, WrapperType.Scene, params);

  const add = (obj: TSceneObject): void => void entity.add(obj);
  const addCamera = (camera: Readonly<TCameraWrapper>): void => add(camera.entity);
  const addActor = (actor: Readonly<TActorWrapper>): void => add(actor.entity);
  const addLight = <T extends TLight>(light: Readonly<TAbstractLightWrapper<T>>): void => add(light.entity);
  const addParticles = (particles: Readonly<TParticlesWrapperAsync>): void => add(particles.entity);
  const addModel = add;

  const addText = (text: Readonly<TTextAnyWrapper>): void => add(text.entity);

  // eslint-disable-next-line functional/immutable-data
  const setFog = (fog: Readonly<TFogWrapper>): void => void (entity.fog = fog.entity);

  function setBackground(color: string | TColor | TTexture | TCubeTexture | TEnvMapTexture): void {
    let background: string | TColor | TTexture | TCubeTexture | null = null;
    if (isString(color)) background = ColorWrapper(color).entity;
    else background = color;
    if (isNotDefined(background)) throw new Error('Invalid background');
    // eslint-disable-next-line functional/immutable-data
    entity.background = background;
  }

  const getBackground = (): TColor | TTexture | TCubeTexture | null => entity.background;

  // eslint-disable-next-line functional/immutable-data
  const setEnvironmentMap = (texture: TEnvMapTexture | TTexture): void => void (entity.environment = texture);

  const getEnvironmentMap = (): TTexture | null => entity.environment;

  const result = {
    ...wrapper,
    addActor,
    addCamera,
    addLight,
    addModel,
    setFog,
    addText,
    addParticles,
    setBackground,
    getBackground,
    setEnvironmentMap,
    getEnvironmentMap,
    ...withObject3d(entity),
    ...withActiveMixin(),
    entity
  };

  result._setActive(params.isActive, true);

  return result;
}
