import { Scene } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IActorWrapper } from '@/Engine/Domains/Actor';
import type { ICameraWrapper } from '@/Engine/Domains/Camera';
import type { IColor } from '@/Engine/Domains/Color';
import { ColorWrapper } from '@/Engine/Domains/Color';
import type { IDataTexture } from '@/Engine/Domains/EnvMap';
import type { ILightWrapper } from '@/Engine/Domains/Light';
import type { ISceneObject, ISceneParams, ISceneWrapper } from '@/Engine/Domains/Scene/Models';
import type { ITextAnyWrapper } from '@/Engine/Domains/Text';
import type { ICubeTexture, ITexture } from '@/Engine/Domains/Texture';
import { withObject3d } from '@/Engine/Mixins';
import type { IWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, isString } from '@/Engine/Utils';

export function SceneWrapper(params: ISceneParams): ISceneWrapper {
  const entity: IWriteable<Scene> = new Scene();

  // eslint-disable-next-line functional/immutable-data
  entity.name = params.name;

  if (isDefined(params.background)) setBackground(params.background);

  const wrapper: IWrapper<Scene> = AbstractWrapper(entity, WrapperType.Scene, params);

  const add = (obj: ISceneObject): void => {
    entity.add(obj);
  };
  const addCamera = (camera: Readonly<ICameraWrapper>): void => add(camera.entity);
  const addActor = (actor: Readonly<IActorWrapper>): void => add(actor.entity);
  const addLight = (light: Readonly<ILightWrapper>): void => add(light.entity);
  const addText = (text: Readonly<ITextAnyWrapper>): void => add(text.entity);

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

  return { ...wrapper, add, addActor, addCamera, addLight, addText, setBackground, getBackground, setEnvironmentMap, getEnvironmentMap, ...withObject3d(entity), entity };
}
