import { combineLatest } from 'rxjs';

import type { IShowcase } from '@/App/Levels/Models';
import type { IActorWrapper, IAppCanvas, ILevel, ILevelConfig } from '@/Engine';
import { ambientContext, buildLevelFromConfig, CameraTag, getRotationByCos, getRotationBySin, isDefined, isNotDefined } from '@/Engine';

import levelConfig from './showcase-level-8.config.json';
import {
  LinearFilter,
  LinearMipMapLinearFilter,
  LinearMipMapNearestFilter,
  MeshBasicMaterial,
  NearestFilter,
  NearestMipMapLinearFilter,
  NearestMipMapNearestFilter,
  SRGBColorSpace,
  TextureLoader
} from 'three';

//Showcase 8: Textures
export function showcaseLevel(canvas: IAppCanvas): IShowcase {
  const level: ILevel = buildLevelFromConfig(canvas, levelConfig as ILevelConfig);

  const textureLoader = new TextureLoader();
  const texture = textureLoader.load(
    '/ShowcaseLevel8/Door_Wood/Door_Wood_001_basecolor.jpg',
    (texture) => {
      console.log(111, texture);
    },
    (xhr) => {
      console.log(222, xhr);
    },
    (error) => {
      console.log(333, error);
    }
  );
  // eslint-disable-next-line functional/immutable-data
  texture.colorSpace = SRGBColorSpace;

  // texture.minFilter = NearestFilter;
  // texture.minFilter = NearestMipMapLinearFilter;
  // texture.minFilter = NearestMipMapNearestFilter;
  // texture.minFilter = LinearMipMapNearestFilter;
  // texture.minFilter = LinearMipMapLinearFilter;
  // texture.minFilter = LinearFilter;
  if (texture.minFilter === NearestFilter) texture.generateMipmaps = false;

  texture.magFilter = LinearFilter; //default
  // texture.magFilter = NearestFilter; //cheaper

  function start(): void {
    level.start();
    const { actorRegistry } = level.entities;
    const actor: IActorWrapper | undefined = actorRegistry.getUniqByTag('central_actor');
    // const material = new MeshBasicMaterial({ map: textureWrapper.entity });
    const material = new MeshBasicMaterial({ map: texture });
    console.log((actor as any)?.entity.material);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (actor as any).entity.material = material;
    initCameraRotation(level, actor);
  }

  return { start, level };
}

// This is mostly a copy of Showcase 3 (camera rotation)
function initCameraRotation(level: ILevel, actor: IActorWrapper | undefined): void {
  const { cameraRegistry } = level.entities;

  const camera = cameraRegistry.getUniqByTag(CameraTag.Active);

  const { mousePositionWatcher, screenSizeWatcher } = ambientContext;
  combineLatest([mousePositionWatcher.value$, screenSizeWatcher.latest$]).subscribe(([{ x, y }, { width, height }]): void => {
    if (isNotDefined(camera)) return;
    const xRatio: number = x / width - 0.5;
    const yRatio: number = -(y / height - 0.5);

    const xRotation: number = getRotationBySin(xRatio, 1, 2);
    const yRotation: number = getRotationByCos(xRatio, 1, 2);
    // camera.setX(xRatio * 10);
    camera.setX(xRotation);
    camera.setY(yRatio * 10);
    camera.setZ(yRotation);

    if (isDefined(actor)) camera.lookAt(actor.getPosition());
  });
}
