import type { Subscription } from 'rxjs';
import type { CubeTexture } from 'three';
import { Scene } from 'three';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TColor } from '@/Engine/Color';
import { ColorWrapper } from '@/Engine/Color';
import type { TEnvMapTexture } from '@/Engine/EnvMap';
import type { TFogWrapper } from '@/Engine/Fog';
import type { TAbstractLightWrapper, TLight } from '@/Engine/Light';
import type { TDestroyable } from '@/Engine/Mixins';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { TModel3d } from '@/Engine/Models3d';
import type { TParticlesWrapper } from '@/Engine/Particles';
import { sceneToConfig } from '@/Engine/Scene/Adapters';
import type { TSceneConfig, TSceneObject, TSceneParams, TSceneWrapper } from '@/Engine/Scene/Models';
import type { TTextAnyWrapper } from '@/Engine/Text';
import type { TTexture } from '@/Engine/Texture';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, isString } from '@/Engine/Utils';

export function SceneWrapper(params: TSceneParams): TSceneWrapper {
  const entity: TWriteable<Scene> = new Scene();

  if (isDefined(params.background)) setBackground(params.background);

  const wrapper: TAbstractWrapper<Scene> = AbstractWrapper(entity, WrapperType.Scene, { name: params.name, tags: params.tags });

  const add = (obj: TSceneObject): void => void entity.add(obj);
  const addCamera = (camera: TCameraWrapper): void => add(camera.entity);
  const addModel3d = (model3d: TModel3d): void => add(model3d.getRawModel3d());
  const addActor = (actor: TActor): void => addModel3d(actor.model3d);
  const addLight = <T extends TLight>(light: Readonly<TAbstractLightWrapper<T>>): void => add(light.entity);
  const addParticles = (particles: Readonly<TParticlesWrapper>): void => add(particles.entity);

  const addText = (text: Readonly<TTextAnyWrapper>): void => add(text.entity);

  // eslint-disable-next-line functional/immutable-data
  const setFog = (fog: Readonly<TFogWrapper>): void => void (entity.fog = fog.entity);

  function setBackground(color: string | TColor | TTexture | CubeTexture | TEnvMapTexture): void {
    let background: string | TColor | TTexture | CubeTexture | null = null;
    if (isString(color)) background = ColorWrapper(color).entity;
    else background = color;
    if (isNotDefined(background)) throw new Error('Invalid background');
    // eslint-disable-next-line functional/immutable-data
    entity.background = background;
  }

  const getBackground = (): TColor | TTexture | CubeTexture | null => entity.background;

  // eslint-disable-next-line functional/immutable-data
  const setEnvironmentMap = (texture: TEnvMapTexture | TTexture): void => void (entity.environment = texture);

  const getEnvironmentMap = (): TTexture | null => entity.environment;

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    addCamera,
    addLight,
    addModel3d,
    addActor,
    setFog,
    addText,
    addParticles,
    setBackground,
    getBackground,
    setEnvironmentMap,
    getEnvironmentMap,
    ...withObject3d(entity),
    ...withActiveMixin(),
    entity,
    serialize: (): TSceneConfig => sceneToConfig(result)
  });

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    entity.traverse((entity: unknown): void => (entity as TDestroyable).destroy$?.next());
    entity.clear();
    (entity.background as CubeTexture)?.dispose?.();

    destroySub$.unsubscribe();
  });

  result._setActive(params.isActive, true);

  return result;
}
