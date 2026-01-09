import type { TActor, TActorRegistry, TSpace, TSpaceConfig, TSpaceLoops, TSpaceServices } from '@Anarchy/Engine';
import { ambientContext, createDomElement, hasKey, KeyCode, metersPerSecond, mpsSpeed, spaceService } from '@Anarchy/Engine';
import { asRecord, isNotDefined } from '@Anarchy/Shared/Utils';
import { combineLatest, withLatestFrom } from 'rxjs';
import { Clock } from 'three';

import type { TAppSettings } from '@/Models';
import { watchActiveRendererReady, watchResourceLoading } from '@/Utils';
import { moveByCircle } from '@/Utils/MoveUtils';

import spaceAlphaConfigJson from './spaceAlpha.json';
import spaceBetaConfigJson from './spaceBeta.json';

const spaceAlphaConfig: TSpaceConfig = spaceAlphaConfigJson as TSpaceConfig;
const spaceBetaConfig: TSpaceConfig = spaceBetaConfigJson as TSpaceConfig;

const actionKeys = {
  GoDown: KeyCode.S,
  GoLeft: KeyCode.A,
  GoRight: KeyCode.D,
  GoUp: KeyCode.W
};

const { GoDown, GoLeft, GoRight, GoUp } = actionKeys;

function createContainersDivs(): void {
  createDomElement(
    ambientContext,
    'div',
    undefined,
    undefined,
    'left_container',
    'position: fixed; left: 0; right: calc(50% + 2px); top: 0; bottom: 0; outline: none; background: oklab(0.91 -0.13 0.05)'
  );
  createDomElement(
    ambientContext,
    'div',
    undefined,
    undefined,
    'right_container',
    'position: fixed; left: calc(50% + 2px); right: 0; top: 0; bottom: 0; outline: none; background: oklab(0.89 -0.08 -0.05);'
  );
}

export function start(settings: TAppSettings): void {
  createContainersDivs();
  const spaces: Record<string, TSpace> = asRecord('name', spaceService.createFromConfig([spaceAlphaConfig, spaceBetaConfig], settings.spaceSettings));
  const spaceAlpha: TSpace = spaces[spaceAlphaConfig.name];
  const spaceBeta: TSpace = spaces[spaceBetaConfig.name];
  if (isNotDefined(spaceAlpha)) throw new Error(`[APP] Space "${spaceAlphaConfig.name}" is not defined`);
  if (isNotDefined(spaceBeta)) throw new Error(`[APP] Space "${spaceBetaConfig.name}" is not defined`);
  watchResourceLoading(spaceAlpha);
  watchResourceLoading(spaceBeta);

  combineLatest([spaceAlpha.built$, spaceBeta.built$]).subscribe(([alpha, beta]: ReadonlyArray<TSpace>): void => {
    runAlpha(alpha);
    runBeta(beta);
  });
}

export function runAlpha(space: TSpace): void {
  watchActiveRendererReady(space);
  moveByCircle('sphere_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  driveByKeyboard('move_actor_left', space.services, space.loops);
  space.start$.next(true);
}

export function runBeta(space: TSpace): void {
  watchActiveRendererReady(space);
  moveByCircle('box_actor', space.services.actorService, space.loops.transformLoop, new Clock());
  driveByKeyboard('move_actor_right', space.services, space.loops);
  space.start$.next(true);
}

function driveByKeyboard(actorName: string, { actorService, keyboardService }: TSpaceServices, { kinematicLoop }: TSpaceLoops): void {
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor = actorRegistry.getByName(actorName);
  const { keys$ } = keyboardService;

  kinematicLoop.tick$.pipe(withLatestFrom(keys$)).subscribe(([delta, { keys }]) => {
    //continues movement while key is pressed
    if (hasKey(GoUp, keys)) actor.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta));
    if (hasKey(GoLeft, keys)) actor.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta));
    if (hasKey(GoDown, keys)) actor.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta));
    if (hasKey(GoRight, keys)) actor.drive.default.addX(mpsSpeed(metersPerSecond(10), delta));
  });
}
