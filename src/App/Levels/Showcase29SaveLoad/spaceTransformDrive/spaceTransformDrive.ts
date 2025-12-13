import { BehaviorSubject } from 'rxjs';
import type { Vector3Like } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

import { attachConnectorPositionToSubj, attachConnectorRotationToSubj } from '@/App/Levels/Utils';
import type { TActor, TSpace, TSpaceConfig } from '@/Engine';
import { getQueryParams, isDefined, isNotDefined, metersPerSecond } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { addAwait, getContainer, removeAwait } from '../utils';
import spaceConfig from './spaceTransformDrive.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

let isOriginalSceneLoaded: boolean = true;
let continuousStepCounter: number = 0;

// TODO 15-0-0: cleanup serialized data from empty kinematic states
// TODO 15-0-0: add physical TD check after serialization physics will be done
export const spaceTransformDriveData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: async (space: TSpace): Promise<void | never> => {
    addAwait('onCreate', spaceTransformDriveData.awaits$);
    space.loops.kinematicLoop.stop();

    const defaultActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_default_actor');
    if (isNotDefined(defaultActor)) throw new Error('[Showcase]: Actor "cube_default_actor" not found');

    const repeaterActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_connected_actor');
    if (isNotDefined(repeaterActor)) throw new Error('[Showcase]: Actor "cube_connected_actor" not found');

    const kinematicActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_kinematic_actor');
    if (isNotDefined(kinematicActor)) throw new Error('[Showcase]: Actor "cube_kinematic_actor" not found');

    const offset: Vector3Like = { x: 4, y: 0, z: 0 };
    //"repeaterActor" is connected with "positionConnector" (from "connected" agent) to "sphereActor" position
    attachConnectorPositionToSubj(repeaterActor, kinematicActor.drive.position$, offset);
    attachConnectorRotationToSubj(repeaterActor, kinematicActor.drive.rotation$);

    removeAwait('onCreate', spaceTransformDriveData.awaits$);
  },
  onChange: async (space: TSpace): Promise<void> => {
    addAwait('onChange', spaceTransformDriveData.awaits$);
    console.log('XXX1 change start');
    const { e2eName } = getQueryParams();

    if (isDefined(e2eName) && e2eName === 'continuous-move') {
      await performContinuousMoveSaveLoadTest(space);
    } else {
      await performNormalSaveLoadTest(space);
      console.log('XXX4 normal test done');
    }

    isOriginalSceneLoaded = false;
    console.log('XXX5 change almost end');
    removeAwait('onChange', spaceTransformDriveData.awaits$);
    console.log('XXX6 change end');
  }
};

async function performNormalSaveLoadTest(space: TSpace): Promise<void> {
  console.log('XXX2 normal test start');
  const defaultActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_default_actor');
  if (isNotDefined(defaultActor)) throw new Error('[Showcase]: Actor "cube_default_actor" not found');
  const kinematicActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_kinematic_actor');

  if (isNotDefined(kinematicActor)) throw new Error('[Showcase]: Actor "cube_kinematic_actor" not found');
  if (isOriginalSceneLoaded) {
    defaultActor.drive.default.addZ(4);
    kinematicActor.drive.kinematic.moveTo(new Vector3(0, 2, 0), metersPerSecond(0.05));
    kinematicActor.drive.kinematic.lookAt(new Vector3(0, 2, 0), metersPerSecond(0.00003));
  }
  console.log('XXX3 normal test almost done');

  return doKinematicSteps(space, 100, 15);
}

async function performContinuousMoveSaveLoadTest(space: TSpace): Promise<void> {
  const defaultActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_default_actor');
  if (isNotDefined(defaultActor)) throw new Error('[Showcase]: Actor "cube_default_actor" not found');

  const kinematicActor: TActor | undefined = space.services.actorService.getRegistry().findByName('cube_kinematic_actor');
  if (isNotDefined(kinematicActor)) throw new Error('[Showcase]: Actor "cube_kinematic_actor" not found');

  // The first step: move kinematic actors (50 ticks), then Save, Load and click again...
  if (continuousStepCounter === 0) {
    defaultActor.drive.default.addZ(4);
    kinematicActor.drive.kinematic.moveTo(new Vector3(0, 2, 0), metersPerSecond(0.05));
    kinematicActor.drive.kinematic.lookAt(new Vector3(0, 2, 0), metersPerSecond(0.00001));
    await doKinematicSteps(space, 50, 10);
  }

  //The second step: ...click after loaded the space. Actors should continue to move (120 ticks more)
  if (continuousStepCounter === 1) {
    await doKinematicSteps(space, 110, 10);
  }

  continuousStepCounter += 1;
}

function doKinematicSteps(space: TSpace, stepsCount: number, stepCooldown: number = 100): Promise<void> {
  return new Promise((resolve): void => {
    let step: number = 0;
    const idx = setInterval((): void => {
      space.loops.kinematicLoop.tick$.next(0);
      step += 1;
      if (step >= stepsCount) resolve(clearInterval(idx));
    }, stepCooldown);
  });
}
