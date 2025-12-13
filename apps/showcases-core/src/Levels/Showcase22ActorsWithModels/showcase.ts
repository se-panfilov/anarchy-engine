import type { TFsmStates, TFsmWrapper, TKeysPressingEvent, TModels3dResourceAsyncRegistry, TRegistryPack, TSpace, TSpaceAnyEvent, TSpaceConfig, TSpaceServices } from '@Anarchy/Engine';
import { KeyCode, SpaceEvents, spaceService } from '@Anarchy/Engine';
import { isEventKey, isKeyPressed } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { distinctUntilChanged } from 'rxjs';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter } from '@/Utils';

import spaceConfigJson from './space.json';
import { initSolder1, initSolder2 } from './Utils';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

function beforeResourcesLoaded(_config: TSpaceConfig, { models3dService }: TSpaceServices): void {
  const models3dResourceRegistry: TModels3dResourceAsyncRegistry = models3dService.getResourceRegistry();

  //Logging models3d loading
  models3dResourceRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<GLTF>): void => console.log(`Model "${name}" is loaded`, model3dSource));
}

export function start(settings: TAppSettings): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], settings.spaceSettings));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);
  space.events$.subscribe((event: TSpaceAnyEvent): void => {
    if (event.name === SpaceEvents.BeforeResourcesLoaded) beforeResourcesLoaded(event.args.config, event.args.services);
  });
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { keyboardService, models3dService } = space.services;
  const { pressing$, released$ } = keyboardService;

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });
  const fadeDuration: number = 0.3;

  const solder1AnimFsm: TFsmWrapper = initSolder1('solder_actor_1', fadeDuration, space.services);
  const solder2AnimFsm: TFsmWrapper = initSolder2('solder_actor_2', fadeDuration, space.services);

  solder1AnimFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    if (state === 'Idle') {
      solder2AnimFsm.send$.next('Idle');
    } else {
      solder2AnimFsm.send$.next('Dance');
    }
  });

  pressing$.subscribe(({ keys }: TKeysPressingEvent): void => {
    const action: 'Run' | 'Walk' = isKeyPressed(KeyCode.ShiftLeft, keys) ? 'Run' : 'Walk';
    if (solder1AnimFsm.getState() !== action) solder1AnimFsm.send$.next(action);
  });

  released$.subscribe((event: KeyboardEvent): void => {
    if (isEventKey(KeyCode.W, event)) solder1AnimFsm.send$.next('Idle');
  });

  space.start$.next(true);
}
