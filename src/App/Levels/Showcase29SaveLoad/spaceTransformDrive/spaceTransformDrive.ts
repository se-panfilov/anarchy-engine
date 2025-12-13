import { BehaviorSubject } from 'rxjs';
import { Vector3 } from 'three/src/math/Vector3';

import { attachConnectorPositionToSubj, attachConnectorRotationToSubj } from '@/App/Levels/Utils';
import type { TActor, TLightWrapper, TSpace, TSpaceConfig, TText3dTextureWrapper } from '@/Engine';
import { getQueryParams, isDefined, isNotDefined, metersPerSecond } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { addAwait, getContainer, removeAwait } from '../utils';
import spaceConfig from './spaceTransformDrive.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

let isOriginalSceneLoaded: boolean = true;
let continuousStepCounter: number = 0;

// TODO 15-0-0: Check other entities TD (light, text, camera, particles, audio3d with debug renderer)
// TODO 15-0-0: Add physical TD check after serialization physics will be done
export const spaceTransformDriveData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: async (space: TSpace): Promise<void | never> => {
    addAwait('onCreate', spaceTransformDriveData.awaits$);
    space.loops.kinematicLoop.stop();

    const { defaultActor, kinematicActor, connectedActor, connectedLight } = getShowcaseActors(space);

    attachConnectorPositionToSubj(connectedActor, kinematicActor.drive.position$, { x: 4, y: 0, z: 0 });
    attachConnectorRotationToSubj(connectedActor, kinematicActor.drive.rotation$);
    attachConnectorPositionToSubj(connectedLight, defaultActor.drive.position$, { x: 4, y: -1, z: 0 });

    removeAwait('onCreate', spaceTransformDriveData.awaits$);
  },
  onChange: async (space: TSpace): Promise<void> => {
    addAwait('onChange', spaceTransformDriveData.awaits$);
    const { e2eName } = getQueryParams();

    if (isDefined(e2eName) && e2eName === 'continuous-move') {
      await performContinuousMoveSaveLoadTest(space);
    } else {
      await performNormalSaveLoadTest(space);
    }

    isOriginalSceneLoaded = false;
    removeAwait('onChange', spaceTransformDriveData.awaits$);
  }
};

async function performNormalSaveLoadTest(space: TSpace): Promise<void> {
  const { defaultActor, kinematicActor, kinematicText } = getShowcaseActors(space);

  if (isOriginalSceneLoaded) {
    defaultActor.drive.default.addZ(4);
    kinematicActor.drive.kinematic.moveTo(new Vector3(0, 2, 0), metersPerSecond(0.05));
    kinematicActor.drive.kinematic.lookAt(new Vector3(0, 2, 0), metersPerSecond(0.00003));
    kinematicText.drive.kinematic.moveTo(new Vector3(2, 2, 2.5), metersPerSecond(0.05));
  }

  return doKinematicSteps(space, 100, 15);
}

async function performContinuousMoveSaveLoadTest(space: TSpace): Promise<void> {
  const { defaultActor, kinematicActor } = getShowcaseActors(space);

  // The first step: move kinematic actors (50 ticks), then Save, Load and click again...
  if (continuousStepCounter === 0) {
    addAwait('continuous_move_0', spaceTransformDriveData.awaits$);
    removeAwait('continuous_move_0', spaceTransformDriveData.awaits$);
    defaultActor.drive.default.addZ(4);
    kinematicActor.drive.kinematic.moveTo(new Vector3(0, 2, 0), metersPerSecond(0.05));
    kinematicActor.drive.kinematic.lookAt(new Vector3(0, 2, 0), metersPerSecond(0.00001));
    await doKinematicSteps(space, 50, 10);
  }

  //The second step: ...click after loaded the space. Actors should continue to move (120 ticks more)
  if (continuousStepCounter === 1) {
    addAwait('continuous_move_1', spaceTransformDriveData.awaits$);
    await doKinematicSteps(space, 110, 10);
    removeAwait('continuous_move_1', spaceTransformDriveData.awaits$);
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

function getShowcaseActors({ services }: TSpace): {
  defaultActor: TActor;
  kinematicActor: TActor;
  connectedActor: TActor;
  kinematicText: TText3dTextureWrapper;
  connectedLight: TLightWrapper;
} {
  const defaultActor: TActor | undefined = services.actorService.getRegistry().findByName('cube_default_actor');
  if (isNotDefined(defaultActor)) throw new Error('[Showcase]: Actor "cube_default_actor" not found');

  const kinematicActor: TActor | undefined = services.actorService.getRegistry().findByName('cube_kinematic_actor');
  if (isNotDefined(kinematicActor)) throw new Error('[Showcase]: Actor "cube_kinematic_actor" not found');

  const connectedActor: TActor | undefined = services.actorService.getRegistry().findByName('cube_connected_actor');
  if (isNotDefined(connectedActor)) throw new Error('[Showcase]: Actor "cube_connected_actor" not found');

  const kinematicText: TText3dTextureWrapper | undefined = services.textService.getRegistries().text3dTextureRegistry.findByName('kinematic_text');
  if (isNotDefined(kinematicText)) throw new Error('[Showcase]: Text "kinematic_text" not found');

  const connectedLight: TLightWrapper | undefined = services.lightService.getRegistry().findByName('connected_light') as TLightWrapper;
  if (isNotDefined(connectedLight)) throw new Error('[Showcase]: Actor "connected_light" not found');

  return { defaultActor, kinematicActor, connectedActor, kinematicText, connectedLight };
}
