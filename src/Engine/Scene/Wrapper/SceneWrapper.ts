import { Scene } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IColor } from '@/Engine/Color';
import { ColorWrapper } from '@/Engine/Color';
import type { IDataTexture } from '@/Engine/EnvMap';
import type { IFogWrapper } from '@/Engine/Fog';
import type { IAbstractLightWrapper, ILight } from '@/Engine/Light';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { IParticlesWrapperAsync } from '@/Engine/Particles';
import type { ISceneObject, ISceneParams, ISceneWrapper } from '@/Engine/Scene/Models';
import type { ITextAnyWrapper } from '@/Engine/Text';
import type { ICubeTexture, ITexture } from '@/Engine/Texture';
import type { IWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, isString } from '@/Engine/Utils';

export function SceneWrapper(params: ISceneParams): ISceneWrapper {
  const entity: IWriteable<Scene> = new Scene();

  if (isDefined(params.background)) setBackground(params.background);

  const wrapper: IWrapper<Scene> = AbstractWrapper(entity, WrapperType.Scene, params);

  const add = (obj: ISceneObject): void => void entity.add(obj);
  const addCamera = (camera: Readonly<ICameraWrapper>): void => add(camera.entity);
  const addActor = (actor: Readonly<IActorWrapperAsync>): void => add(actor.entity);
  const addLight = <T extends ILight>(light: Readonly<IAbstractLightWrapper<T>>): void => add(light.entity);
  const addParticles = (particles: Readonly<IParticlesWrapperAsync>): void => add(particles.entity);

  const addText = (text: Readonly<ITextAnyWrapper>): void => add(text.entity);

  // eslint-disable-next-line functional/immutable-data
  const setFog = (fog: Readonly<IFogWrapper>): void => void (entity.fog = fog.entity);

  function setBackground(color: string | IColor | ITexture | ICubeTexture | IDataTexture): void {
    let background: string | IColor | ITexture | ICubeTexture | null = null;
    if (isString(color)) background = ColorWrapper(color).entity;
    else background = color;
    if (isNotDefined(background)) throw new Error('Invalid background');
    // eslint-disable-next-line functional/immutable-data
    entity.background = background;
  }

  const getBackground = (): IColor | ITexture | ICubeTexture | null => entity.background;

  // eslint-disable-next-line functional/immutable-data
  const setEnvironmentMap = (texture: IDataTexture | ITexture): void => void (entity.environment = texture);

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
