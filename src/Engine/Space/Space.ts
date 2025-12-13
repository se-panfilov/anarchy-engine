import type { Subscription } from 'rxjs';
import { merge, ReplaySubject } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
import { ambientContext } from '@/Engine/Context';
import type { IControlsFactory, IControlsRegistry, IOrbitControlsConfig, IOrbitControlsWrapper } from '@/Engine/Controls';
import { ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import type { IDataTexture } from '@/Engine/EnvMap';
import { envMapService } from '@/Engine/EnvMap';
import type { ILoopTimes } from '@/Engine/Loop';
import { standardLoopService } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import type { IRendererFactory, IRendererRegistry, IRendererWrapper } from '@/Engine/Renderer';
import { RendererFactory, RendererModes, RendererRegistry, RendererTag } from '@/Engine/Renderer';
import type { ISceneWrapper } from '@/Engine/Scene';
import { SceneTag } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { initActors, initCameras, initFogs, initLights, initScenes } from '@/Engine/Space/Initializers/Initialize';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceEntities, IWithBuilt } from '@/Engine/Space/Models';
import { isSpaceInitializationConfig, setInitialActiveCamera } from '@/Engine/Space/SpaceHelper';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer, ITextAnyWrapper, ITextConfig, ITextFactory } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer, isText2dWrapper, isText3dWrapper, Text2dRegistry, Text3dRegistry, TextFactory } from '@/Engine/Text';
import { isDefined, isNotDefined, validLevelConfig } from '@/Engine/Utils';

// TODO (S.Panfilov) extract this type
type ISpaceSubscriptions = Readonly<{
  actorEntityCreated$: Subscription;
  actorAdded$: Subscription;
  textEntityCreated$: Subscription;
  textAdded$: Subscription;
  cameraEntityCreated$: Subscription;
  cameraAdded$: Subscription;
  lightEntityCreated$: Subscription;
  lightAdded$: Subscription;
  fogEntityCreated$: Subscription;
  fogAdded$: Subscription;
  controlsEntityCreated$: Subscription;
  loopTickSubscription: Subscription;
}>;

export function buildSpaceFromConfig(canvas: IAppCanvas, config: ISpaceConfig): ISpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }
  const { initSpace, name, actors, cameras, lights, fogs, texts, controls, scenes, tags } = config;
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();

  // TODO (S.Panfilov) CWP do not init space if the param set to false, or init namely what is set to true
  if (!initSpace) return; // TODO (S.Panfilov) guess not return, but do the bare minimum
  if (isSpaceInitializationConfig(initSpace)) {
    const { isScenesInit, isActorsInit, isCamerasInit, isLightsInit, isFogsInit, isTextsInit, isControlsInit, isEnvMapsInit } = initSpace;

    // TODO (S.Panfilov) move somewhere?
    screenService.setCanvas(canvas);

    const entities: ISpaceEntities = {};
    const subscriptions: ISpaceSubscriptions = {};
    let isScenesReady: boolean = false;

    //build scenes
    if (isScenesInit) {
      const { created$: sceneEntityCreated$, factory: sceneFactory, registry: sceneRegistry } = initScenes(scenes);
      messages$.next(`Scenes (${scenes.length}) created`);
      const scene: ISceneWrapper | undefined = sceneRegistry.findByTag(SceneTag.Current);
      if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for space "${name}" during the space building.`);
      entities = { ...entities, sceneFactory, sceneRegistry };
      subscriptions = { ...subscriptions, sceneEntityCreated$ };
      isScenesReady = true;
    }

    //build actors
    if (isActorsInit && isScenesReady) {
      const actorsMessage$: ReplaySubject<IActorWrapperAsync> = new ReplaySubject<IActorWrapperAsync>();
      const { added$: actorEntityAdded$, created$: actorEntityCreated$, factory: actorFactory, registry: actorRegistry } = initActors(scenes, actors, actorsMessage$);
      entities = { ...entities, actorFactory, actorRegistry };
      subscriptions = { ...subscriptions, actorEntityAdded$, actorEntityCreated$ };
      // TODO (S.Panfilov) implement:
      //when actorsMessage$ length === actors.length, then actors are ready
    }

    //build texts
    const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
    const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
    const textFactory: ITextFactory = TextFactory();
    const text2dRegistry: IText2dRegistry = Text2dRegistry();
    const text3dRegistry: IText3dRegistry = Text3dRegistry();
    const textAdded$: Subscription = merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: ITextAnyWrapper) => scene.addText(text));
    const textEntityCreated$: Subscription = textFactory.entityCreated$.subscribe((text: ITextAnyWrapper): void => {
      if (isText2dWrapper(text)) text2dRegistry.add(text);
      if (isText3dWrapper(text)) text3dRegistry.add(text);
    });
    texts.forEach((text: ITextConfig): ITextAnyWrapper => textFactory.create(textFactory.configToParams({ ...text, tags: [...text.tags, CommonTag.FromConfig] })));
    messages$.next(`Texts (${texts.length}) created`);

    //build cameras
    if (isCamerasInit && isScenesReady) {
      const { added$: cameraEntityAdded$, created$: cameraEntityCreated$, factory: cameraFactory, registry: cameraRegistry } = initCameras(scenes, cameras);
      entities = { ...entities, cameraFactory, cameraRegistry };
      subscriptions = { ...subscriptions, cameraEntityAdded$, cameraEntityCreated$ };
      messages$.next(`Cameras (${cameras.length}) created`);
    }

    //build controls
    const controlsFactory: IControlsFactory = ControlsFactory();
    const controlsRegistry: IControlsRegistry = ControlsRegistry();
    const controlsEntityCreated$: Subscription = controlsFactory.entityCreated$.subscribe((controls: IOrbitControlsWrapper): void => controlsRegistry.add(controls));
    controls.forEach(
      (control: IOrbitControlsConfig): IOrbitControlsWrapper =>
        controlsFactory.create(controlsFactory.configToParams({ ...control, tags: [...control.tags, CommonTag.FromConfig] }, { cameraRegistry, canvas }))
    );
    messages$.next(`Controls (${controls.length}) created`);

    //build lights
    if (isLightsInit && isScenesReady) {
      const { added$: lightEntityAdded$, created$: lightEntityCreated$, factory: lightFactory, registry: lightRegistry } = initLights(scenes, lights);
      entities = { ...entities, lightFactory, lightRegistry };
      subscriptions = { ...subscriptions, lightEntityAdded$, lightEntityCreated$ };
      messages$.next(`Lights (${lights.length}) created`);
    }

    //build fogs
    if (isFogsInit && isScenesReady) {
      const { added$: fogEntityAdded$, created$: fogEntityCreated$, factory: fogFactory, registry: fogRegistry } = initFogs(scenes, fogs);
      entities = { ...entities, fogFactory, fogRegistry };
      subscriptions = { ...subscriptions, fogEntityAdded$, fogEntityCreated$ };
      messages$.next(`Fogs (${fogs.length}) created`);
    }

    //env maps
    envMapService.added$.subscribe((texture: IDataTexture): void => {
      scene.setBackground(texture);
      scene.setEnvironmentMap(texture);
      messages$.next(`Env map added: "${texture.id}"`);
    });

    //build renderer
    const rendererFactory: IRendererFactory = RendererFactory();
    const rendererRegistry: IRendererRegistry = RendererRegistry();
    const rendererEntityCreated$: Subscription = rendererFactory.entityCreated$.subscribe((renderer: IRendererWrapper): void => rendererRegistry.add(renderer));
    const renderer: IRendererWrapper = rendererFactory.create({ canvas, tags: [RendererTag.Main], mode: RendererModes.WebGL2 });
    messages$.next(`Renderer created`);

    const loopTickSubscription: Subscription = standardLoopService.tick$.subscribe(({ delta }: ILoopTimes): void => {
      const activeCamera: ICameraWrapper | undefined = cameraRegistry.getActiveCamera();
      if (isDefined(activeCamera)) {
        renderer.entity.render(scene.entity, activeCamera.entity);
        // TODO (S.Panfilov) update these text renderers only when there are any text (or maybe only when it's changed)
        if (!text2dRegistry.isEmpty()) text2dRenderer.renderer.render(scene.entity, activeCamera.entity);
        if (!text3dRegistry.isEmpty()) text3dRenderer.renderer.render(scene.entity, activeCamera.entity);
      }

      // just for control's damping
      controlsRegistry.getAll().forEach((controls: IOrbitControlsWrapper): void => {
        if (controls.entity.enableDamping) controls.entity.update(delta);
      });
    });

    const destroyable: IDestroyable = destroyableMixin();
    const builtMixin: IWithBuilt = withBuiltMixin();

    destroyable.destroyed$.subscribe(() => {
      builtMixin.built$.complete();

      sceneEntityCreated$.unsubscribe();

      actorEntityCreated$.unsubscribe();
      actorFactory.destroy();
      actorAdded$.unsubscribe();
      actorRegistry.destroy();

      textEntityCreated$.unsubscribe();
      textFactory.destroy();
      textAdded$.unsubscribe();
      text2dRegistry.destroy();
      text3dRegistry.destroy();

      cameraEntityCreated$.unsubscribe();
      cameraFactory.destroy();
      cameraAdded$.unsubscribe();
      cameraRegistry.destroy();

      lightEntityCreated$.unsubscribe();
      lightFactory.destroy();
      lightAdded$.unsubscribe();
      lightRegistry.destroy();

      fogEntityCreated$.unsubscribe();
      fogFactory.destroy();
      fogAdded$.unsubscribe();
      fogRegistry.destroy();

      controlsEntityCreated$.unsubscribe();
      controlsFactory.destroy();
      controlsRegistry.destroy();

      rendererEntityCreated$.unsubscribe();
      rendererFactory.destroy();
      rendererRegistry.destroy();

      loopTickSubscription.unsubscribe();

      messages$.complete();
    });

    builtMixin.build();
  }

  return {
    name,
    start(): void {
      setInitialActiveCamera(cameraRegistry);
      standardLoopService.start();
      messages$.next(`Space started`);
    },
    stop(): void {
      // TODO (S.Panfilov) implement stop
      // if (isDefined(intersectionsWatcher)) intersectionsWatcher.stop();
      // loop.stop(renderer, scene, controlsRegistry, cameraRegistry);
      messages$.next(`Space stopped`);
    },
    entities,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTags(tags),
    messages$: messages$.asObservable()
  };
}
