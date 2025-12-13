import type { Subscription } from 'rxjs';

import type { TActor, TActorRegistry, TKeyboardPressingEvent, TSpaceServices } from '@/Engine';
import { createDomElement, isDefined, isNotDefined, KeyCode, metersPerSecond, mpsSpeed } from '@/Engine';

export function createContainersDivs(): void {
  createDomElement(
    'div',
    undefined,
    undefined,
    'left_top_container',
    'position: fixed; left: 0; right: calc(50% + 2px); top: 0; bottom: calc(50% + 2px); outline: none; background: oklab(0.91 -0.13 0.05)'
  );
  createDomElement(
    'div',
    undefined,
    undefined,
    'right_top_container',
    'position: fixed; left: calc(50% + 2px); right: 0; top: 0; bottom: calc(50% + 2px); outline: none; background: oklab(0.89 -0.08 -0.05);'
  );
  createDomElement(
    'div',
    undefined,
    undefined,
    'left_bottom_container',
    'position: fixed; left: 0; right: calc(50% + 2px); top: calc(50% + 2px); bottom: 0; outline: none; background: oklab(0.81 0.11 -0.1)'
  );
  createDomElement(
    'div',
    undefined,
    undefined,
    'right_bottom_container',
    'position: fixed; left: calc(50% + 2px); right: 0; top: calc(50% + 2px); bottom: 0; outline: none; background: oklab(0.79 0 -0.11)'
  );
}

export function addBtn(text: string, containerId: string, cb: (...rest: ReadonlyArray<any>) => void, right?: string, left?: string, top?: string): void {
  let container: HTMLDivElement | null = document.querySelector('#' + containerId);
  if (isNotDefined(container)) {
    container = document.createElement('div');
    // eslint-disable-next-line functional/immutable-data
    container.id = containerId;
    // eslint-disable-next-line functional/immutable-data
    container.style.position = 'absolute';
    // eslint-disable-next-line functional/immutable-data
    container.style.top = top ?? '10px';
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(right)) container.style.right = right;
    // eslint-disable-next-line functional/immutable-data
    if (isDefined(left)) container.style.left = left;
    // eslint-disable-next-line functional/immutable-data
    container.style.display = 'flex';
    // eslint-disable-next-line functional/immutable-data
    container.style.gap = '8px';
    document.body.appendChild(container);
  }

  const button: HTMLButtonElement = document.createElement('button');
  // eslint-disable-next-line functional/immutable-data
  button.textContent = text;

  button.addEventListener('click', cb);
  container.appendChild(button);
}

export function driveByKeyboard(actorName: string, { actorService, keyboardService }: TSpaceServices): void {
  const actorRegistry: TActorRegistry = actorService.getRegistry();
  const actor: TActor | undefined = actorRegistry.findByName(actorName);
  if (isNotDefined(actor)) throw new Error(`Actor "${actorName}" is not defined`);

  const { onKey } = keyboardService;

  onKey(KeyCode.W).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addZ(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.A).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addX(mpsSpeed(metersPerSecond(-10), delta)));
  onKey(KeyCode.S).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addZ(mpsSpeed(metersPerSecond(10), delta)));
  onKey(KeyCode.D).pressing$.subscribe(({ delta }: TKeyboardPressingEvent): void => void actor.drive.default.addX(mpsSpeed(metersPerSecond(10), delta)));
}

export function destroySpace(totalSubscriptions: number, completedSubscriptions: number, subscriptionStacks: Map<Subscription, string>, cb: () => void, shouldLogStack: boolean = false): void {
  console.log('Subscriptions before destroy:', totalSubscriptions);
  console.log('Cleaning up...');
  cb();

  setTimeout(() => console.log(`Completed: ${completedSubscriptions}`), 1000);
  setTimeout(() => console.log(`Active: ${totalSubscriptions - completedSubscriptions}`), 1100);
  if (shouldLogStack) setTimeout(() => console.log(subscriptionStacks), 1200);
}
