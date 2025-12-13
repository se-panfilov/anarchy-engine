import GUI from 'lil-gui';
import { CameraHelper, DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import type { IShowcase } from '@/App/Levels/Models';
import type { IAppCanvas, IDirectionalLightWrapper, IHemisphereLightWrapper, ILevel, ILevelConfig, IPointLightWrapper, IRectAreaLightWrapper, ISceneWrapper, ISpotLightWrapper } from '@/Engine';
import { buildLevelFromConfig, isNotDefined } from '@/Engine';

import levelConfig from './showcase-13-fog.json';

//Showcase 13: Fog
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const gui: GUI = new GUI();
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);
  const { lightRegistry, scenesRegistry } = level.entities;

  function init(): void {
    const scene: ISceneWrapper | undefined = scenesRegistry.getUniqByTag('current');
    if (isNotDefined(scene)) throw new Error('Scene not found');
  }

  function start(): void {
    level.start();
    void init();
  }

  return { start, level };
}
