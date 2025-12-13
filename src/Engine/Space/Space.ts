import type { Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
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
import { initActors, initCameras, initFogs, initLights, initScenes, initTexts } from '@/Engine/Space/Initializers/Initialize';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceEntities, IWithBuilt } from '@/Engine/Space/Models';
import { isSpaceInitializationConfig, setInitialActiveCamera } from '@/Engine/Space/SpaceHelper';
import { isDefined, isNotDefined, validLevelConfig } from '@/Engine/Utils';

// TODO (S.Panfilov) extract this type
type ISpaceSubscriptions = Readonly<{
  actorCreated$: Subscription;
  actorAdded$: Subscription;
  textCreated$: Subscription;
  textAdded$: Subscription;
  cameraCreated$: Subscription;
  cameraAdded$: Subscription;
  lightCreated$: Subscription;
  lightAdded$: Subscription;
  fogCreated$: Subscription;
  fogAdded$: Subscription;
  controlsCreated$: Subscription;
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
      const { sceneCreated$, sceneFactory, sceneRegistry } = initScenes(scenes);
      messages$.next(`Scenes (${scenes.length}) created`);
      const scene: ISceneWrapper | undefined = sceneRegistry.findByTag(SceneTag.Current);
      if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for space "${name}" during the space building.`);
      entities = { ...entities, sceneFactory, sceneRegistry };
      subscriptions = { ...subscriptions, sceneCreated$ };
      isScenesReady = true;
    }

    //build actors
    if (isActorsInit && isScenesReady) {
      const actorsMessage$: ReplaySubject<IActorWrapperAsync> = new ReplaySubject<IActorWrapperAsync>();
      const { actorAdded$, actorCreated$, actorFactory, actorRegistry } = initActors(scenes, actors, actorsMessage$);
      entities = { ...entities, actorFactory, actorRegistry };
      subscriptions = { ...subscriptions, actorAdded$, actorCreated$ };
      // TODO (S.Panfilov) implement:
      //when actorsMessage$ length === actors.length, then actors are ready
      //messages$.next(`Actors (${actors.length}) created`);
    }

    //build texts
    if (isTextsInit && isScenesReady) {
      const { textAdded$, textCreated$, textFactory, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer } = initTexts(scene, texts);
      entities = { ...entities, textFactory, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer };
      subscriptions = { ...subscriptions, textAdded$, textCreated$ };
      messages$.next(`Texts (${texts.length}) created`);
    }

    //build cameras
    if (isCamerasInit && isScenesReady) {
      const { cameraAdded$, cameraCreated$, cameraFactory, cameraRegistry } = initCameras(scenes, cameras);
      entities = { ...entities, cameraFactory, cameraRegistry };
      subscriptions = { ...subscriptions, cameraAdded$, cameraCreated$ };
      messages$.next(`Cameras (${cameras.length}) created`);
    }

    //build controls
    const controlsFactory: IControlsFactory = ControlsFactory();
    const controlsRegistry: IControlsRegistry = ControlsRegistry();
    const controlsCreated$: Subscription = controlsFactory.entityCreated$.subscribe((controls: IOrbitControlsWrapper): void => controlsRegistry.add(controls));
    controls.forEach(
      (control: IOrbitControlsConfig): IOrbitControlsWrapper =>
        controlsFactory.create(controlsFactory.configToParams({ ...control, tags: [...control.tags, CommonTag.FromConfig] }, { cameraRegistry, canvas }))
    );
    messages$.next(`Controls (${controls.length}) created`);

    //build lights
    if (isLightsInit && isScenesReady) {
      const { lightAdded$, lightCreated$, lightFactory, lightRegistry } = initLights(scenes, lights);
      entities = { ...entities, lightFactory, lightRegistry };
      subscriptions = { ...subscriptions, lightAdded$, lightCreated$ };
      messages$.next(`Lights (${lights.length}) created`);
    }

    //build fogs
    if (isFogsInit && isScenesReady) {
      const { fogAdded$, fogCreated$, fogFactory, fogRegistry } = initFogs(scenes, fogs);
      entities = { ...entities, fogFactory, fogRegistry };
      subscriptions = { ...subscriptions, fogAdded$, fogCreated$ };
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
    const rendererCreated$: Subscription = rendererFactory.entityCreated$.subscribe((renderer: IRendererWrapper): void => rendererRegistry.add(renderer));
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

      sceneCreated$.unsubscribe();

      actorCreated$.unsubscribe();
      actorFactory.destroy();
      actorAdded$.unsubscribe();
      actorRegistry.destroy();

      textCreated$.unsubscribe();
      textFactory.destroy();
      textAdded$.unsubscribe();
      text2dRegistry.destroy();
      text3dRegistry.destroy();

      cameraCreated$.unsubscribe();
      cameraFactory.destroy();
      cameraAdded$.unsubscribe();
      cameraRegistry.destroy();

      lightCreated$.unsubscribe();
      lightFactory.destroy();
      lightAdded$.unsubscribe();
      lightRegistry.destroy();

      fogCreated$.unsubscribe();
      fogFactory.destroy();
      fogAdded$.unsubscribe();
      fogRegistry.destroy();

      controlsCreated$.unsubscribe();
      controlsFactory.destroy();
      controlsRegistry.destroy();

      rendererCreated$.unsubscribe();
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
