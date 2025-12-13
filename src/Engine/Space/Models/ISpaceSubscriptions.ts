import type { Subscription } from 'rxjs';

export type ISpaceSubscriptions = Readonly<{
  sceneCreated$: Subscription;
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
