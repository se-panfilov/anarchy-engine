import { merge, Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import type { IAppCanvas } from '@/Engine/App';
import type { ICameraConfig, ICameraFactory, ICameraRegistry, ICameraService, ICameraWrapper } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import type { IControlsFactory, IControlsRegistry, IOrbitControlsConfig, IOrbitControlsWrapper } from '@/Engine/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import type { IDataTexture, IEnvMapService } from '@/Engine/EnvMap';
import { EnvMapService } from '@/Engine/EnvMap';
import type { ILoopTimes } from '@/Engine/Loop';
import { standardLoopService } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@/Engine/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererTag } from '@/Engine/Renderer';
import type { ISceneConfig, ISceneFactory, ISceneRegistry, ISceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, SceneTag } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceFactories, ISpaceRegistries, ISpaceRenderer, ISpaceServices, IWithBuilt } from '@/Engine/Space/Models';
import { getBoolValue, setInitialActiveCamera } from '@/Engine/Space/SpaceHelper';
import { isDefined, isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';
import { CommonTag } from '@/Engine/Abstract';
import type { IActorAsyncRegistry, IActorConfig, IActorFactory, IActorParams, IActorWrapperAsync } from '@/Engine/Actor';
import { ActorAsyncRegistry, ActorFactory } from '@/Engine/Actor';
import { initText2dRenderer, initText3dRenderer, isText2dWrapper, isText3dWrapper, Text2dRegistry, Text3dRegistry, TextFactory } from '@/Engine/Text';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer, ITextAnyWrapper, ITextConfig, ITextFactory } from '@/Engine/Text';
import { ambientContext } from '@/Engine/Context';
import type { IAbstractLightWrapper, ILight, ILightConfig, ILightFactory, ILightRegistry } from '@/Engine/Light';
import { LightFactory, LightRegistry } from '@/Engine/Light';
import type { IFogConfig, IFogFactory, IFogRegistry, IFogService, IFogWrapper } from '@/Engine/Fog';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';

export function buildSpaceFromConfig(canvas: IAppCanvas, config: ISpaceConfig): ISpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }
  const { initSpace, name, actors, cameras, lights, fogs, texts, controls, scenes, tags } = config;
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();

  const isScenesInit: boolean = getBoolValue('isScenesInit', initSpace);
  const isActorsInit: boolean = getBoolValue('isActorsInit', initSpace);
  const isCamerasInit: boolean = getBoolValue('isCamerasInit', initSpace);
  const isLightsInit: boolean = getBoolValue('isLightsInit', initSpace);
  const isFogsInit: boolean = getBoolValue('isFogsInit', initSpace);
  const isTextsInit: boolean = getBoolValue('isTextsInit', initSpace);
  const isControlsInit: boolean = getBoolValue('isControlsInit', initSpace);
  const isEnvMapsInit: boolean = getBoolValue('isEnvMapsInit', initSpace);
  const isRendererInit: boolean = getBoolValue('isRendererInit', initSpace);
  const isLoopInit: boolean = getBoolValue('isLoopInit', initSpace);

  screenService.setCanvas(canvas);

  let scene: ISceneWrapper | undefined = undefined;
  let factories: ISpaceFactories = {};
  let regisgistries: ISpaceRegistries = {};
  let services: ISpaceServices = {};
  let renderers: ISpaceRenderer = {};

  //build scenes
  if (isScenesInit) {
    const sceneFactory: ISceneFactory = SceneFactory();
    const sceneRegistry: ISceneRegistry = SceneRegistry();
    const sceneService: ISceneService = SceneService(sceneFactory, sceneRegistry);

    // TODO (S.Panfilov) move this into the service
    //sceneFactory.entityCreated$.subscribe((wrapper: ISceneWrapper): void => sceneRegistry.add(wrapper));
    ////

    // TODO (S.Panfilov) use service
    scenes.forEach((config: ISceneConfig): ISceneWrapper => sceneFactory.create(sceneFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

    messages$.next(`Scenes (${scenes.length}) created`);
    scene = sceneRegistry.findByTag(SceneTag.Current);
    if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for space "${name}" during the space building.`);

    factories = { ...factories, sceneFactory };
    regisgistries = { ...regisgistries, sceneRegistry };
    services = { ...services, sceneService };
  }

  //build actors
  if (isActorsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for actors initialization');

    const actorFactory: IActorFactory = ActorFactory();
    const actorRegistry: IActorAsyncRegistry = ActorAsyncRegistry();
    const actorService: IActorService = ActorService(actorFactory, actorRegistry, scene);

    // TODO (S.Panfilov) move this into the service
    actorRegistry.added$.subscribe((wrapper: IActorWrapperAsync) => scene.addActor(wrapper));
    actorFactory.entityCreated$.subscribe((wrapper: IActorWrapperAsync): void => actorRegistry.add(wrapper));
    ////

    // TODO (S.Panfilov) use service
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    actors.forEach((config: IActorConfig): Promise<IActorWrapperAsync> => {
      const params: IActorParams = actorFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] });
      return actorFactory.createAsync(params);
    });

    factories = { ...factories, actorFactory };
    regisgistries = { ...regisgistries, actorRegistry };
    services = { ...services, actorService };
    messages$.next(`Actors (${actors.length}) created (async))`);
  }

  //build texts
  if (isTextsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for texts initialization');

    const textFactory: ITextFactory = TextFactory();

    const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
    const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);

    const text2dRegistry: IText2dRegistry = Text2dRegistry();
    const text3dRegistry: IText3dRegistry = Text3dRegistry();

    const textService: ITextService = TextService(textFactory, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer);

    // TODO (S.Panfilov) move this into the service
    merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: ITextAnyWrapper) => scene.addText(text));
    textFactory.entityCreated$.subscribe((text: ITextAnyWrapper): void => {
      if (isText2dWrapper(text)) text2dRegistry.add(text);
      if (isText3dWrapper(text)) text3dRegistry.add(text);
    });
    ////

    // TODO (S.Panfilov) use service
    texts.forEach((text: ITextConfig): ITextAnyWrapper => textFactory.create(textFactory.configToParams({ ...text, tags: [...text.tags, CommonTag.FromConfig] })));

    factories = { ...factories, textFactory };
    regisgistries = { ...regisgistries, text2dRegistry, text3dRegistry };
    services = { ...services, textService };
    renderers = { ...renderers, text2dRenderer, text3dRenderer };

    messages$.next(`Texts (${texts.length}) created`);
  }

  //build cameras
  if (isCamerasInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for cameras initialization');
    const cameraFactory: ICameraFactory = CameraFactory();
    const cameraRegistry: ICameraRegistry = CameraRegistry();
    const cameraService: ICameraService = CameraService(cameraFactory, cameraRegistry, scene);

    // TODO (S.Panfilov) use service
    cameras.forEach((config: ICameraConfig): ICameraWrapper => cameraFactory.create(cameraFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

    factories = { ...factories, cameraFactory };
    regisgistries = { ...regisgistries, cameraRegistry };
    services = { ...services, cameraService };

    messages$.next(`Cameras (${cameras.length}) created`);
  }

  //build controls
  if (isControlsInit) {
    if (isNotDefined(isCamerasInit)) throw new Error('Camera initialization should be "true" for controls initialization');
    if (isNotDefined(regisgistries.cameraRegistry)) throw new Error('Cannot find camera registry for controls initialization');

    const controlsFactory: IControlsFactory = ControlsFactory();
    const controlsRegistry: IControlsRegistry = ControlsRegistry();
    const controlsService: IControlsService = ControlsService(controlsFactory, controlsRegistry, cameraRegistry, canvas);

    // TODO (S.Panfilov) move this into the service
    controlsFactory.entityCreated$.subscribe((wrapper: IOrbitControlsWrapper): void => controlsRegistry.add(wrapper));
    ////

    // TODO (S.Panfilov) use service
    controls.forEach(
      (control: IOrbitControlsConfig): IOrbitControlsWrapper =>
        controlsFactory.create(controlsFactory.configToParams({ ...control, tags: [...control.tags, CommonTag.FromConfig] }, { cameraRegistry, canvas }))
    );

    factories = { ...factories, controlsFactory };
    regisgistries = { ...regisgistries, controlsRegistry };
    services = { ...services, controlsService };
    messages$.next(`Controls (${controls.length}) created`);
  }

  //build lights
  if (isLightsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for lights initialization');

    const lightFactory: ILightFactory = LightFactory();
    const lightRegistry: ILightRegistry = LightRegistry();
    const lightService: ILightService = LightService(lightFactory, lightRegistry, scene);

    // TODO (S.Panfilov) move this into the service
    lightRegistry.added$.subscribe((wrapper: IAbstractLightWrapper<ILight>) => scene.addLight(wrapper));
    lightFactory.entityCreated$.subscribe((wrapper: IAbstractLightWrapper<ILight>): void => lightRegistry.add(wrapper));
    ////

    // TODO (S.Panfilov) use service
    lights.forEach((config: ILightConfig): IAbstractLightWrapper<ILight> => lightFactory.create(lightFactory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

    factories = { ...factories, lightFactory };
    regisgistries = { ...regisgistries, lightRegistry };
    services = { ...services, lightService };
    messages$.next(`Lights (${lights.length}) created`);
  }

  //build fogs
  if (isFogsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for fogs initialization');

    const fogFactory: IFogFactory = FogFactory();
    const fogRegistry: IFogRegistry = FogRegistry();
    const fogService: IFogService = FogService(fogFactory, fogRegistry, scene);

    // TODO (S.Panfilov) move this into the service
    fogRegistry.added$.subscribe((fog: IFogWrapper) => scene.setFog(fog));
    fogFactory.entityCreated$.subscribe((fog: IFogWrapper): void => fogRegistry.add(fog));
    ////

    // TODO (S.Panfilov) use service
    fogs.forEach((fog: IFogConfig): IFogWrapper => fogFactory.create(fogFactory.configToParams({ ...fog, tags: [...fog.tags, CommonTag.FromConfig] })));

    factories = { ...factories, fogFactory };
    regisgistries = { ...regisgistries, fogRegistry };
    services = { ...services, fogService };
    messages$.next(`Fogs (${fogs.length}) created`);
  }

  //env maps
  if (isEnvMapsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for fogs initialization');
    const envMapService: IEnvMapService = EnvMapService();

    envMapService.added$.subscribe((texture: IDataTexture): void => {
      scene.setBackground(texture);
      scene.setEnvironmentMap(texture);
      messages$.next(`Env map added: "${texture.id}"`);
    });
    services = { ...services, envMapService };
  }

  //build renderer
  if (isRendererInit) {
    const rendererFactory: IRendererFactory = RendererFactory();
    const rendererRegistry: IRendererRegistry = RendererRegistry();
    const rendererService: IRendererService = RendererService(rendererFactory, rendererRegistry);

    // TODO (S.Panfilov) move this into the service
    rendererFactory.entityCreated$.subscribe((wrapper: IRendererWrapper): void => rendererRegistry.add(wrapper));
    ////

    // TODO (S.Panfilov) use service
    const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main], mode: RendererModes.WebGL2 });

    factories = { ...factories, rendererFactory };
    regisgistries = { ...regisgistries, rendererRegistry };
    services = { ...services, rendererService };
    renderers = { ...renderer, renderer };
    messages$.next(`Renderer ("${renderer.id}") created`);
  }

  let loopTick$: Subscription | undefined;
  if (isLoopInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for loop initialization');
    if (isNotDefined(entities.cameraRegistry)) throw new Error('Cannot find camera registry for loop initialization');
    if (isNotDefined(entities.rendererRegistry)) throw new Error('Cannot find renderer registry for loop initialization');
    if (isNotDefined(renderer)) throw new Error('Cannot find renderer');
    if (isNotDefined(entities.controlsRegistry)) throw new Error('Cannot find controls registry for loop initialization');

    loopTick$ = standardLoopService.tick$.subscribe(({ delta }: ILoopTimes): void => {
      const activeCamera: ICameraWrapper | undefined = entities.cameraRegistry?.getActiveCamera();
      if (isDefined(activeCamera)) {
        renderer.entity.render(scene.entity, activeCamera.entity);
        // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
        if (isTextsInit) {
          if (!entities.text2dRegistry?.isEmpty()) entities.text2dRenderer?.renderer.render(scene.entity, activeCamera.entity);
          if (!entities.text3dRegistry?.isEmpty()) entities.text3dRenderer?.renderer.render(scene.entity, activeCamera.entity);
        }
      }

      if (isNotDefined(loopTick$)) throw new Error('Loop tick subscription is not defined');

      // just for control's damping
      entities.controlsRegistry?.getAll().forEach((controls: IOrbitControlsWrapper): void => {
        if (controls.entity.enableDamping) controls.entity.update(delta);
      });
    });
  }

  const destroyable: IDestroyable = destroyableMixin();
  const builtMixin: IWithBuilt = withBuiltMixin();

  destroyable.destroyed$.subscribe(() => {
    builtMixin.built$.complete();
    Object.values(entities).forEach((entity): void => void (isDestroyable(entity) && entity.destroy()));
    messages$.next('Space destroyed');
    messages$.complete();
  });

  builtMixin.build();

  return {
    name,
    start(): void {
      if (isCamerasInit && isDefined(entities.cameraRegistry)) setInitialActiveCamera(entities.cameraRegistry);
      standardLoopService.start();
      messages$.next(`Space started`);
    },
    stop(): void {
      // TODO (S.Panfilov) implement stop
      // if (isDefined(intersectionsWatcher)) intersectionsWatcher.stop();
      // loop.stop(renderer, scene, controlsRegistry, cameraRegistry);
      messages$.next(`Space stopped`);
    },
    factories,
    regisgistries,
    services,
    renderers,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTags(tags),
    messages$: messages$.asObservable()
  };
}
