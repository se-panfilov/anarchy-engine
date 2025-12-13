import { Scene } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TColor } from '@/Engine/Color';
import { ColorWrapper } from '@/Engine/Color';
import type { TDataTexture } from '@/Engine/EnvMap';
import type { TFogWrapper } from '@/Engine/Fog';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { IParticlesWrapperAsync } from '@/Engine/Particles';
import type { ISceneObject, ISceneParams, TSceneWrapper } from '@/Engine/Scene/Models';
import type { ITextAnyWrapper } from '@/Engine/Text';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, isString } from '@/Engine/Utils';

export function SceneWrapper(params: ISceneParams): TSceneWrapper {
  const entity: TWriteable<Scene> = new Scene();

  if (isDefined(params.background)) setBackground(params.background);

  const wrapper: TWrapper<Scene> = AbstractWrapper(entity, WrapperType.Scene, params);

  const add = (obj: ISceneObject): void => void entity.add(obj);
  const addCamera = (camera: Readonly<TCameraWrapper>): void => add(camera.entity);
  const addActor = (actor: Readonly<TActorWrapperAsync>): void => add(actor.entity);
  const addLight = <T extends TLight>(light: Readonly<TAbstractLightWrapper<T>>): void => add(light.entity);
  const addParticles = (particles: Readonly<IParticlesWrapperAsync>): void => add(particles.entity);

  const addText = (text: Readonly<ITextAnyWrapper>): void => add(text.entity);

  // eslint-disable-next-line functional/immutable-data
  const setFog = (fog: Readonly<TFogWrapper>): void => void (entity.fog = fog.entity);

  function setBackground(color: string | TColor | ITexture | ICubeTexture | TDataTexture): void {
    let background: string | TColor | ITexture | ICubeTexture | null = null;
    if (isString(color)) background = ColorWrapper(color).entity;
    else background = color;
    if (isNotDefined(background)) throw new Error('Invalid background');
    // eslint-disable-next-line functional/immutable-data
    entity.background = background;
  }

  const getBackground = (): TColor | ITexture | ICubeTexture | null => entity.background;

  // eslint-disable-next-line functional/immutable-data
  const setEnvironmentMap = (texture: TDataTexture | ITexture): void => void (entity.environment = texture);

  const getEnvironmentMap = (): ITexture | null => entity.environment;

  const result = {
    ...wrapper,
    addActor,
    addCamera,
    addLight,
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
