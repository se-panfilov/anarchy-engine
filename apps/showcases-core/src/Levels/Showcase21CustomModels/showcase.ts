import type { TKeyEvent, TModel3d, TModels3dRegistry, TModels3dResourceAsyncRegistry, TRegistryPack, TSceneWrapper, TSpace, TSpaceAnyEvent, TSpaceConfig, TSpaceServices } from '@Anarchy/Engine';
import { isKeyInEvent, isPressEvent, KeyCode, SpaceEvents, spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import type { AnimationAction } from 'three';
import { Euler, Vector3 } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter } from '@/Utils';

import spaceConfigJson from './space.json';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

function beforeResourcesLoaded(_config: TSpaceConfig, { models3dService, scenesService }: TSpaceServices): void {
  const models3dRegistry: TModels3dRegistry = models3dService.getRegistry();
  const models3dResourceRegistry: TModels3dResourceAsyncRegistry = models3dService.getResourceRegistry();
  const sceneW: TSceneWrapper = scenesService.getActive();

  //Adding models3d to the scene
  models3dResourceRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<GLTF>): void => {
    console.log(`Model "${name}" is loaded`);

    //Preventing creating the same model twice (it's already created once config is loaded)
    if (name !== 'fox_glb') models3dService.create({ name, model3dSource, position: new Vector3(), rotation: new Euler() });
  });

  models3dRegistry.added$.subscribe(({ key, value: model3dSource }: TRegistryPack<TModel3d>): void => {
    console.log(`Model "${model3dSource.name}" is created (${key})`);
    sceneW.addModel3d(model3dSource);
  });
}

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  space.events$.subscribe((event: TSpaceAnyEvent): void => {
    if (event.name === SpaceEvents.BeforeResourcesLoaded) beforeResourcesLoaded(event.args.config, event.args.services);
  });

  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export async function showcase(space: TSpace): Promise<void> {
  console.log('Press keys 1..3 to play animations of related models');

  const originalName: string = 'fox_gltf_original';
  const cloneName: string = 'fox_gltf_clone_1';
  const originalCompressedName: string = 'fox_glb_config_original';

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });

  const scale: Vector3 = new Vector3(0.025, 0.025, 0.025);
  const { animationsService, keyboardService, models3dService } = space.services;

  //gltf model
  await models3dService.loadAsync({ name: originalName, url: 'resources/Models/Fox/Fox.gltf', options: { scale } });

  //Let's clone the original model (which was loaded from the code)
  const modelOriginal: TModel3d = models3dService.getRegistry().getByName(originalName);
  models3dService.clone(modelOriginal, { name: cloneName, position: new Vector3(-5, 0, 0) });
  const modelClone: TModel3d = models3dService.getRegistry().getByName(cloneName);
  const modelCompressed: TModel3d = models3dService.getRegistry().getByName(originalCompressedName);

  const runActionOriginalModel: AnimationAction = animationsService.startAutoUpdateMixer(modelOriginal).actions['Run'];
  const runActionCloneModel: AnimationAction = animationsService.startAutoUpdateMixer(modelClone).actions['Run'];
  const runActionCompressedModel: AnimationAction = animationsService.startAutoUpdateMixer(modelCompressed).actions['Run'];

  keyboardService.keys$.pipe().subscribe((event: TKeyEvent): void => {
    const action = isPressEvent(event) ? 'play' : ('stop' as const);
    if (isKeyInEvent(KeyCode.One, event)) runActionCloneModel?.[action]();
    if (isKeyInEvent(KeyCode.Two, event)) runActionOriginalModel?.[action]();
    if (isKeyInEvent(KeyCode.Three, event)) runActionCompressedModel?.[action]();
  });

  space.start$.next(true);
}
