import type { IWrapper } from '@Engine/Domains/Abstract';
import { AbstractWrapper } from '@Engine/Domains/Abstract';
import type { IActorWrapper } from '@Engine/Domains/Actor';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import type { ILightWrapper } from '@Engine/Domains/Light';
import type { IWriteable } from '@Engine/Utils';
import { isDefined, isNotDefined, isString } from '@Engine/Utils';
import type { IColor, ICubeTexture, ITexture } from '@Engine/Wrappers';
import { ColorWrapper } from '@Engine/Wrappers';
import { Scene } from 'three';

import type { ISceneObject, ISceneParams, ISceneWrapper } from '../Models';

export function SceneWrapper(params: ISceneParams): ISceneWrapper {
  const entity: IWriteable<Scene> = new Scene();

  // eslint-disable-next-line functional/immutable-data
  entity.name = params.name;

  if (isDefined(params.background)) setBackground(params.background);

  const wrapper: IWrapper<Scene> = AbstractWrapper(entity, params);

  function add(obj: ISceneObject): void {
    entity.add(obj);
  }

  function addCamera(camera: Readonly<ICameraWrapper>): void {
    add(camera.entity);
  }

  function addActor(actor: Readonly<IActorWrapper>): void {
    add(actor.entity);
  }

  function addLight(light: Readonly<ILightWrapper>): void {
    add(light.entity);
  }

  function setBackground(color: string | IColor | ITexture | ICubeTexture): void {
    let background: string | IColor | ITexture | ICubeTexture | null = null;
    if (isString(color)) background = ColorWrapper(color).entity;
    else background = color;
    if (isNotDefined(background)) throw new Error('Invalid background color');
    // eslint-disable-next-line functional/immutable-data
    entity.background = background;
  }

  function getBackground(): IColor | ITexture | ICubeTexture | null {
    return entity.background;
  }

  return { ...wrapper, add, addActor, addCamera, addLight, setBackground, getBackground, entity };
}
