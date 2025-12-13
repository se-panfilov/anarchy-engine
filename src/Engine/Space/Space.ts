import type { Subscription } from 'rxjs';

import type { IAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import type { IOrbitControlsWrapper } from '@/Engine/Controls';
import type { IDataTexture } from '@/Engine/EnvMap';
import type { ILoopService, ILoopTimes } from '@/Engine/Loop';
import { LoopService } from '@/Engine/Loop';
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
import type { IText2dRenderer, IText3dRenderer } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer } from '@/Engine/Text';
import { isDefined, isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';

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

  const { cameraService, lightService, fogService, envMapService, textService, rendererService } = services;

  cameraService.createFromConfig(cameras);
  services.actorService.createFromConfig(actors);

  const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  textService.createFromConfig(texts);

  services.controlsService.createFromConfig(controls, cameraService.getRegistry());
  lightService.createFromConfig(lights);

  //build intersections
  // TODO (S.Panfilov) We need to load intersections from config as well as the other entities

  fogService.createFromConfig(fogs);

  //env maps
  envMapService.added$.subscribe((texture: IDataTexture): void => {
    activeScene.setBackground(texture);
    activeScene.setEnvironmentMap(texture);
  });

  const renderer: IRendererWrapper = rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });
  const loopService: ILoopService = LoopService();

  const loopTick$: Subscription = loopService.tick$.subscribe(({ delta }: ILoopTimes): void => {
    const activeCamera: ICameraWrapper | undefined = cameraService?.findActiveCamera();
    if (isDefined(activeCamera)) {
      if (isNotDefined(renderer)) throw new Error('Cannot find renderer');
      renderer.entity.render(activeScene.entity, activeCamera.entity);
      // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
      if (!text2dRegistry?.isEmpty()) text2dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
      if (!text3dRegistry?.isEmpty()) text3dRenderer?.renderer.render(activeScene.entity, activeCamera.entity);
    }

    if (isNotDefined(loopTick$)) throw new Error('Loop tick subscription is not defined');

    // just for control's damping
    controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper): void => {
      if (controls.entity.enableDamping) controls.entity.update(delta);
    });
  });

  const destroyable: IDestroyable = destroyableMixin();
  const builtMixin: IWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();
    Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy()));
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
