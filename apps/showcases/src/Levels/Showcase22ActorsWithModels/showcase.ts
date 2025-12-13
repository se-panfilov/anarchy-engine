import { distinctUntilChanged } from 'rxjs';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { addGizmo } from '@/Levels/Utils';
import type { TFsmStates, TFsmWrapper, TModels3dResourceAsyncRegistry, TRegistryPack, TSpace, TSpaceConfig, TSpaceServices } from '@Engine';
import { asRecord, isNotDefined, KeyCode, KeysExtra, spaceService } from '@Engine';

import spaceConfigJson from './space.json';
import { initSolder1, initSolder2 } from './Utils';

const spaceConfig: TSpaceConfig = spaceConfigJson as TSpaceConfig;

function beforeResourcesLoaded(_config: TSpaceConfig, { models3dService }: TSpaceServices): void {
  const models3dResourceRegistry: TModels3dResourceAsyncRegistry = models3dService.getResourceRegistry();

  //Logging models3d loading
  models3dResourceRegistry.added$.subscribe(({ key: name, value: model3dSource }: TRegistryPack<GLTF>): void => console.log(`Model "${name}" is loaded`, model3dSource));
}

export function start(): void {
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceConfig], { beforeResourcesLoaded }));
  const space: TSpace = spaces[spaceConfig.name];
  if (isNotDefined(space)) throw new Error(`Showcase "${spaceConfig.name}": Space is not defined`);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  const { keyboardService } = space.services;
  const { onKey, isKeyPressed } = keyboardService;

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });
  const fadeDuration = 0.3;

  const solder1AnimFsm: TFsmWrapper = initSolder1('solder_actor_1', fadeDuration, space.services);
  const solder2AnimFsm: TFsmWrapper = initSolder2('solder_actor_2', fadeDuration, space.services);

  solder1AnimFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    if (state === 'Idle') {
      solder2AnimFsm.send$.next('Idle');
    } else {
      solder2AnimFsm.send$.next('Dance');
    }
  });

  onKey(KeyCode.W).pressing$.subscribe((): void => {
    const action: 'Run' | 'Walk' = isKeyPressed(KeysExtra.Shift) ? 'Run' : 'Walk';
    if (solder1AnimFsm.getState() !== action) solder1AnimFsm.send$.next(action);
  });

  onKey(KeyCode.W).released$.subscribe((): void => {
    solder1AnimFsm.send$.next('Idle');
  });

  space.start$.next(true);
}
