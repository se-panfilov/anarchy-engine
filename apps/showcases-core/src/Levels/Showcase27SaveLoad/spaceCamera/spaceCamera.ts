import type { TPerspectiveCameraWrapper, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { BehaviorSubject } from 'rxjs';
import { Euler, Quaternion, Vector3 } from 'three';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceCamera.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceCameraData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onChange: (space: TSpace): void => {
    const camera: TPerspectiveCameraWrapper = space.services.cameraService.getActive() as TPerspectiveCameraWrapper;

    camera.setFov(100);

    const rotation: Euler = new Euler(-2.879975303042544, 0.8041367970357067, 2.951086186540901);
    camera.drive.rotation$.next(new Quaternion().setFromEuler(rotation));
    camera.drive.position$.next(new Vector3(28.672614163776107, 6.92408866503931, -27.63943185331239));
  }
};
