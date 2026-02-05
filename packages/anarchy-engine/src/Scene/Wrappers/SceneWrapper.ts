import type { TAbstractWrapper } from '@hellpig/anarchy-engine/Abstract';
import { AbstractWrapper, WrapperType } from '@hellpig/anarchy-engine/Abstract';
import type { TActor } from '@hellpig/anarchy-engine/Actor';
import type { TAnyCameraWrapper } from '@hellpig/anarchy-engine/Camera';
import type { TColor } from '@hellpig/anarchy-engine/Color';
import { ColorWrapper } from '@hellpig/anarchy-engine/Color';
import type { TEnvMapTexture } from '@hellpig/anarchy-engine/EnvMap';
import type { TFogWrapper } from '@hellpig/anarchy-engine/Fog';
import type { TAbstractLightWrapper, TAnyLight } from '@hellpig/anarchy-engine/Light';
import type { TDestroyable } from '@hellpig/anarchy-engine/Mixins';
import { withActiveMixin, withObject3d } from '@hellpig/anarchy-engine/Mixins';
import type { TModel3d } from '@hellpig/anarchy-engine/Models3d';
import type { TParticlesWrapper } from '@hellpig/anarchy-engine/Particles';
import { sceneEntityToConfig } from '@hellpig/anarchy-engine/Scene/Adapters';
import type { TSceneConfig, TSceneObject, TSceneParams, TSceneWrapper } from '@hellpig/anarchy-engine/Scene/Models';
import type { TTextAnyWrapper } from '@hellpig/anarchy-engine/Text';
import type { TTexture } from '@hellpig/anarchy-engine/Texture';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import { isDefined, isNotDefined, isString } from '@hellpig/anarchy-shared/Utils';
import type { Subscription } from 'rxjs';
import type { CubeTexture } from 'three';
import { Scene } from 'three';

export function SceneWrapper(params: TSceneParams): TSceneWrapper {
  const entity: TWriteable<Scene> = new Scene();

  if (isDefined(params.background)) setBackground(params.background);

  const wrapper: TAbstractWrapper<Scene> = AbstractWrapper(entity, WrapperType.Scene, params);

  const add = (obj: TSceneObject): void => void entity.add(obj);
  const addCamera = (camera: TAnyCameraWrapper): void => add(camera.entity);
  const addModel3d = (model3d: TModel3d): void => add(model3d.getRawModel3d());
  const addActor = (actor: TActor): void => addModel3d(actor.model3d);
  const addLight = <T extends TAnyLight>(light: Readonly<TAbstractLightWrapper<T>>): void => add(light.entity);
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
    serialize: (): TSceneConfig => sceneEntityToConfig(result)
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
