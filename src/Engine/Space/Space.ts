import type { IAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import type { IDataTexture } from '@/Engine/EnvMap';
import type { ILoopTimes } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic';
import type { IRendererWrapper } from '@/Engine/Renderer';
import { RendererModes } from '@/Engine/Renderer';
import type { IScenesService, ISceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceServices, IWithBuilt } from '@/Engine/Space/Models';
import { initServices } from '@/Engine/Space/SpaceHelpers';
import { spaceLoop } from '@/Engine/Space/SpaceLoop';
import type { IText2dRenderer, IText3dRenderer } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer } from '@/Engine/Text';
import { isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';

export function buildSpaceFromConfig(canvas: IAppCanvas, config: ISpaceConfig): ISpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }

  const { name, actors, cameras, lights, fogs, texts, controls, scenes, tags } = config;

  screenService.setCanvas(canvas);

  let activeScene: ISceneWrapper;
  const services: ISpaceServices = initServices(canvas, (scenesService: IScenesService): ISceneWrapper | never => {
    scenesService.createFromConfig(scenes);
    const scene: ISceneWrapper | undefined = scenesService.findActiveScene();
    if (isNotDefined(scene)) throw new Error(`Cannot find an active scene for space "${name}" during space's services initialization.`);
    activeScene = scene;
    return activeScene;
  });

  const { cameraService, controlsService, lightService, loopService, fogService, envMapService, intersectionsService, textService, rendererService } = services;

  cameraService.createFromConfig(cameras);
  services.actorService.createFromConfig(actors);

  const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createFromConfig(texts);

  controlsService.createFromConfig(controls, cameraService.getRegistry());
  lightService.createFromConfig(lights);

  //build intersections
  // TODO (S.Panfilov) We need to load intersections from config as well as the other entities
  // intersectionsService.createFromConfig(intersections);

  fogService.createFromConfig(fogs);

  envMapService.added$.subscribe((texture: IDataTexture): void => {
    activeScene.setBackground(texture);
    activeScene.setEnvironmentMap(texture);
  });

  const renderer: IRendererWrapper = rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });
  const { text2dRegistry, text3dRegistry } = textService.getRegistries();
  const controlsRegistry = controlsService.getRegistry();

  const camera: ICameraWrapper | undefined = cameraService.findActive();
  if (isNotDefined(camera)) throw new Error(`Cannot find an active camera for space "${name}" during space's initialization.`);
  loopService.tick$.subscribe(({ delta }: ILoopTimes): void => spaceLoop(delta, camera, renderer, activeScene, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer, controlsRegistry));

  const destroyable: IDestroyable = destroyableMixin();
  const builtMixin: IWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();
    Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy()));
    loopService.stop();
    loopService.destroy();
  });

  builtMixin.build();

  return {
    name,
    start(): void {
      loopService.start();
    },
    stop(): void {
      // TODO (S.Panfilov) implement stop
      // if (isDefined(intersectionsWatcher)) intersectionsWatcher.stop();
      // loop.stop(renderer, activeScene, controlsRegistry, cameraRegistry);
    },
    services,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTags(tags)
  };
}
