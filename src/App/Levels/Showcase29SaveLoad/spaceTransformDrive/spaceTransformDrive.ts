import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import type { Vector3Like } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

import { attachConnectorPositionToSubj, attachConnectorRotationToSubj } from '@/App/Levels/Utils';
import type { TActor, TSpace, TSpaceConfig } from '@/Engine';
import { isNotDefined, metersPerSecond } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceTransformDrive.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

// TODO 15-0-0: we need to test a "flying state": the fact that kinematic/physics actor will continue to move after the "Load" (perhaps add a separate E2E for this)
// TODO 15-0-0: add physical TD check after serialization physics will be done
export const spaceTransformDriveData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace, subscriptions?: Record<string, Subscription>): void | never => {
    // space.loops.kinematicLoop.

    const defaultActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_default_actor');
    if (isNotDefined(defaultActor)) throw new Error('[Showcase]: Actor "cube_default_actor" not found');

    const repeaterActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_connected_actor');
    if (isNotDefined(repeaterActor)) throw new Error('[Showcase]: Actor "cube_connected_actor" not found');

    const kinematicActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_kinematic_actor');
    if (isNotDefined(kinematicActor)) throw new Error('[Showcase]: Actor "cube_kinematic_actor" not found');

    // kinematicActor.drive.kinematic.rotateTo()
    kinematicActor.drive.kinematic.moveTo(new Vector3(0, 2, 0), metersPerSecond(0.5));
    kinematicActor.drive.kinematic.lookAt(new Vector3(0, 2, 0), metersPerSecond(0.001));

    const offset: Vector3Like = { x: 4, y: 0, z: 0 };
    //"repeaterActor" is connected with "positionConnector" (from "connected" agent) to "sphereActor" position
    attachConnectorPositionToSubj(repeaterActor, kinematicActor.drive.position$, offset);
    attachConnectorRotationToSubj(repeaterActor, kinematicActor.drive.rotation$);
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
