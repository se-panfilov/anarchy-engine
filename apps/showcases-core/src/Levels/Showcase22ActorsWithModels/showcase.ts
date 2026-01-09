import type { TFsmStates, TFsmWrapper, TKeyEvent, TModels3dResourceAsyncRegistry, TRegistryPack, TSpace, TSpaceAnyEvent, TSpaceConfig, TSpaceServices } from '@Anarchy/Engine';
import { KeyCode, SpaceEvents, spaceService } from '@Anarchy/Engine';
import { hasKey } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { distinctUntilChanged } from 'rxjs';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAppSettings } from '@/Models';
import { addGizmo, enableFPSCounter, watchActiveRendererReady, watchResourceLoading } from '@/Utils';

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
  watchResourceLoading(space);
  space.events$.subscribe((event: TSpaceAnyEvent): void => {
    if (event.name === SpaceEvents.BeforeResourcesLoaded) beforeResourcesLoaded(event.args.config, event.args.services);
  });
  if (settings.loopsDebugInfo) enableFPSCounter(space.loops.renderLoop.tick$);

  space.built$.subscribe(showcase);
}

export function showcase(space: TSpace): void {
  watchActiveRendererReady(space);
  const { keyboardService } = space.services;
  const { keys$ } = keyboardService;

  const walk = 'Walk' as const;
  const run = 'Run' as const;
  const idle = 'Idle' as const;
  const dance = 'Dance' as const;

  addGizmo(space.services, space.container, space.loops, { placement: 'bottom-left' });
  const fadeDuration: number = 0.3;

  const solder1AnimFsm: TFsmWrapper = initSolder1('solder_actor_1', fadeDuration, space.services);
  const solder2AnimFsm: TFsmWrapper = initSolder2('solder_actor_2', fadeDuration, space.services);

  solder1AnimFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    if (state === idle) {
      solder2AnimFsm.send$.next(idle);
    } else {
      solder2AnimFsm.send$.next(dance);
    }
  });

  keys$.subscribe(({ keys }: TKeyEvent): void => {
    const isWalk: boolean = hasKey(KeyCode.W, keys);
    const isRun: boolean = isWalk && hasKey(KeyCode.ShiftLeft, keys);
    const action = isRun ? run : isWalk ? walk : idle;
    if (solder1AnimFsm.getState() !== action) solder1AnimFsm.send$.next(action);
  });

  space.start$.next(true);
}
