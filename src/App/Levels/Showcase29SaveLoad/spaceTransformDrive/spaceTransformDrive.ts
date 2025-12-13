import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import type { Vector3Like } from 'three';

import { attachConnectorPositionToSubj, attachConnectorRotationToSubj } from '@/App/Levels/Utils';
import type { TActor, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceTransformDrive.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

// TODO 15-0-0: add physical TD check after serialization physics will be done
export const spaceTransformDriveData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    const defaultActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_default_actor');
    if (isNotDefined(defaultActor)) throw new Error('[Showcase]: Actor "cube_default_actor" not found');

    const repeaterActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_connected_actor');
    if (isNotDefined(repeaterActor)) throw new Error('[Showcase]: Actor "cube_connected_actor" not found');

    const offset: Vector3Like = { x: 4, y: 0, z: 0 };
    //"repeaterActor" is connected with "positionConnector" (from "connected" agent) to "sphereActor" position
    attachConnectorPositionToSubj(repeaterActor, defaultActor.drive.position$, offset);
    attachConnectorRotationToSubj(repeaterActor, defaultActor.drive.rotation$);
  },
  onChange: (space: TSpace): void => {
    // TODO 15-0-0:  Do loops stop after the change (and on reload) to check the screenshot
    const defaultActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_default_actor');
    if (isNotDefined(defaultActor)) throw new Error('[Showcase]: Actor "cube_default_actor" not found');

    defaultActor.drive.default.addX(4);
  },
  onUnload: (_space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    //
  }
};
