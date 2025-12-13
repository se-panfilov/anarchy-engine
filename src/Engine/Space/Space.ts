import type { Subscription } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import type { IAppCanvas } from '@/Engine/App';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IOrbitControlsWrapper } from '@/Engine/Controls';
import type { IDataTexture } from '@/Engine/EnvMap';
import { envMapService } from '@/Engine/EnvMap';
import type { ILoopTimes } from '@/Engine/Loop';
import { standardLoopService } from '@/Engine/Loop';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import type { IRendererWrapper } from '@/Engine/Renderer';
import type { ISceneWrapper } from '@/Engine/Scene';
import { SceneTag } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { initActorsEntityPipe, initCamerasEntityPipe, initFogsEntityPipe, initLightsEntityPipe, initScenesEntityPipe, initTextsEntityPipe } from '@/Engine/Space/EntityPipes';
import { initControlsEntityPipe } from '@/Engine/Space/EntityPipes/ControlsEntityPipe';
import { initRenderersEntityPipe } from '@/Engine/Space/EntityPipes/RendererEntityPipe';
import { withBuiltMixin } from '@/Engine/Space/Mixin';
import type { ISpace, ISpaceConfig, ISpaceEntities, ISpaceSubscriptions, IWithBuilt } from '@/Engine/Space/Models';
import { getBoolValue, setInitialActiveCamera } from '@/Engine/Space/SpaceHelper';
import { isDefined, isDestroyable, isNotDefined, validLevelConfig } from '@/Engine/Utils';

export function buildSpaceFromConfig(canvas: IAppCanvas, config: ISpaceConfig): ISpace {
  const { isValid, errors } = validLevelConfig(config);
  if (!isValid) {
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }
  const { initSpace, name, actors, cameras, lights, fogs, texts, controls, scenes, tags } = config;
  const messages$: ReplaySubject<string> = new ReplaySubject<string>();

  let entities: Partial<ISpaceEntities> = {};

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

  let subscriptions: ISpaceSubscriptions = {};
  let scene: ISceneWrapper | undefined = undefined;

  //build scenes
  if (isScenesInit) {
    const { sceneCreated$, sceneFactory, sceneRegistry } = initScenesEntityPipe(scenes);
    messages$.next(`Scenes (${scenes.length}) created`);
    scene = sceneRegistry.findByTag(SceneTag.Current);
    if (isNotDefined(scene)) throw new Error(`Cannot find the current scene for space "${name}" during the space building.`);
    entities = { ...entities, sceneFactory, sceneRegistry };
    subscriptions = { ...subscriptions, sceneCreated$ };
  }

  //build actors
  if (isActorsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for actors initialization');

    const { actorAdded$, actorCreated$, actorFactory, actorRegistry } = initActorsEntityPipe(scene, actors);
    entities = { ...entities, actorFactory, actorRegistry };
    subscriptions = { ...subscriptions, actorAdded$, actorCreated$ };
    messages$.next(`Actors (${actors.length}) created (async))`);
  }

  //build texts
  if (isTextsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for texts initialization');

    const { textAdded$, textCreated$, textFactory, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer } = initTextsEntityPipe(scene, texts);
    entities = { ...entities, textFactory, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer };
    subscriptions = { ...subscriptions, textAdded$, textCreated$ };
    messages$.next(`Texts (${texts.length}) created`);
  }

  //build cameras
  if (isCamerasInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for cameras initialization');

    const { cameraAdded$, cameraCreated$, cameraFactory, cameraRegistry } = initCamerasEntityPipe(scene, cameras);
    entities = { ...entities, cameraFactory, cameraRegistry };
    subscriptions = { ...subscriptions, cameraAdded$, cameraCreated$ };
    messages$.next(`Cameras (${cameras.length}) created`);
  }

  //build controls
  if (isControlsInit) {
    if (isNotDefined(isCamerasInit)) throw new Error('Camera initialization should be "true" for controls initialization');
    if (isNotDefined(entities.cameraRegistry)) throw new Error('Cannot find camera registry for controls initialization');

    const { controlsCreated$, controlsFactory, controlsRegistry } = initControlsEntityPipe(entities.cameraRegistry, canvas, controls);
    entities = { ...entities, controlsFactory, controlsRegistry };
    subscriptions = { ...subscriptions, controlsCreated$ };
    messages$.next(`Controls (${controls.length}) created`);
  }

  //build lights
  if (isLightsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for lights initialization');

    const { lightAdded$, lightCreated$, lightFactory, lightRegistry } = initLightsEntityPipe(scene, lights);
    entities = { ...entities, lightFactory, lightRegistry };
    subscriptions = { ...subscriptions, lightAdded$, lightCreated$ };
    messages$.next(`Lights (${lights.length}) created`);
  }

  //build fogs
  if (isFogsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for fogs initialization');

    const { fogAdded$, fogCreated$, fogFactory, fogRegistry } = initFogsEntityPipe(scene, fogs);
    entities = { ...entities, fogFactory, fogRegistry };
    subscriptions = { ...subscriptions, fogAdded$, fogCreated$ };
    messages$.next(`Fogs (${fogs.length}) created`);
  }

  //env maps
  if (isEnvMapsInit) {
    if (isNotDefined(scene)) throw new Error('Scene should be initialized for fogs initialization');

    const envMapAdded$: Subscription = envMapService.added$.subscribe((texture: IDataTexture): void => {
      scene.setBackground(texture);
      scene.setEnvironmentMap(texture);
      messages$.next(`Env map added: "${texture.id}"`);
    });

    subscriptions = { ...subscriptions, envMapAdded$ };
  }

  //build renderer
  let renderer: IRendererWrapper | undefined = undefined;
  if (isRendererInit) {
    const { renderer: currentRenderer, rendererCreated$, rendererFactory, rendererRegistry } = initRenderersEntityPipe(canvas);
    entities = { ...entities, rendererFactory, rendererRegistry };
    subscriptions = { ...subscriptions, rendererCreated$ };
    renderer = currentRenderer;
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
      subscriptions = { ...subscriptions, loopTick$ };

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
    Object.values(subscriptions).forEach((sub: Subscription): void => sub.unsubscribe());
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
    entities,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    ...withTags(tags),
    messages$: messages$.asObservable()
  };
}
