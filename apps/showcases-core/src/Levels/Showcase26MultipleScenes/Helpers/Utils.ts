import type { TActor, TActorRegistry, TKeysPressingEvent, TParticlesWrapper, TSpace, TSpaceServices } from '@Anarchy/Engine';
import { ambientContext, createDomElement, KeyCode, metersPerSecond, mpsSpeed } from '@Anarchy/Engine';

import type { TSubscriptionsData } from '@/Levels/Showcase26MultipleScenes/Helpers/TSubscriptionsData';
import { addBtn } from '@/Utils';

export function createContainersDivs(): void {
  createDomElement(
    ambientContext,
    'div',
    undefined,
    undefined,
    'left_top_container',
    'position: fixed; left: 0; right: calc(50% + 2px); top: 0; bottom: calc(50% + 2px); outline: none; background: oklab(0.91 -0.13 0.05)'
  );
  createDomElement(
    ambientContext,
    'div',
    undefined,
    undefined,
    'right_top_container',
    'position: fixed; left: calc(50% + 2px); right: 0; top: 0; bottom: calc(50% + 2px); outline: none; background: oklab(0.89 -0.08 -0.05);'
  );
  createDomElement(
    ambientContext,
    'div',
    undefined,
    undefined,
    'left_bottom_container',
    'position: fixed; left: 0; right: calc(50% + 2px); top: calc(50% + 2px); bottom: 0; outline: none; background: oklab(0.81 0.11 -0.1)'
  );
  createDomElement(
    ambientContext,
    'div',
    undefined,
    undefined,
    'right_bottom_container',
    'position: fixed; left: calc(50% + 2px); right: 0; top: calc(50% + 2px); bottom: 0; outline: none; background: oklab(0.79 0 -0.11)'
  );
}

export function driveByKeyboard(actorName: string, { actorService, keyboardService }: TSpaceServices): void {
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor = actorRegistry.getByName(actorName);
  const { onKey } = keyboardService;

  onKey(KeyCode.W).pressing$.subscribe(({ delta }: TKeysPressingEvent): void => void actor.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.A).pressing$.subscribe(({ delta }: TKeysPressingEvent): void => void actor.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.S).pressing$.subscribe(({ delta }: TKeysPressingEvent): void => void actor.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta)));
  onKey(KeyCode.D).pressing$.subscribe(({ delta }: TKeysPressingEvent): void => void actor.drive.default.addX(mpsSpeed(metersPerSecond(10), delta)));
}

export function destroySpace({ totalSubscriptions, completedSubscriptions, subscriptionStacks }: TSubscriptionsData, cb: () => void, shouldLogStack: boolean = false): void {
  console.log('Subscriptions before destroy:', totalSubscriptions);
  console.log('Cleaning up...');
  cb();

  setTimeout(() => console.log(`Completed: ${completedSubscriptions}`), 1000);
  setTimeout(() => console.log(`Active: ${totalSubscriptions - completedSubscriptions}`), 1100);
  if (shouldLogStack) setTimeout(() => console.log(subscriptionStacks), 1200);
}

export function createButtons(sceneName: string, containerId: string, space: TSpace, isTop: boolean, isRight: boolean, subscriptionData: TSubscriptionsData, shouldLogStack: boolean = false): void {
  const top: string | undefined = isTop ? undefined : 'calc(50% + 14px)';
  const right: string | undefined = !isRight ? 'calc(50% + 14px)' : '4px';
  // const left: string | undefined = isRight ? 'calc(50% + 14px)' : undefined;

  addBtn(`Start ${sceneName}`, containerId, (): void => space.start$.next(true), { right, top });
  addBtn(`Stop  ${sceneName}`, containerId, (): void => space.start$.next(false));
  addBtn(`Destroy  ${sceneName}`, containerId, (): void => destroySpace(subscriptionData, (): void => space.destroy$.next(), shouldLogStack));
  addBtn(`Drop  ${sceneName}`, containerId, (): void => destroySpace(subscriptionData, (): void => space.drop(), shouldLogStack));
}

export function addParticles(space: TSpace): void {
  const count: number = 50000;
  const positions: Float32Array = new Float32Array(count * 3);
  const colors: Float32Array = new Float32Array(count * 3);

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < count * 3; i++) {
    // eslint-disable-next-line functional/immutable-data
    positions[i] = (Math.random() - 0.5) * 100;
    // eslint-disable-next-line functional/immutable-data
    colors[i] = Math.random();
  }

  const { particlesService } = space.services;

  const particlesName: string = 'bubbles';
  const particles: TParticlesWrapper = particlesService.getRegistry().getByName(particlesName);
  particles.setIndividualPositions(positions);
}
