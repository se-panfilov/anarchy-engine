import { Vector3 } from 'three';

import type { TMeters, TRadians } from '@/Engine/Math';
import { getAzimuthFromDirection, getElevationFromDirection } from '@/Engine/Math';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

type TTempCoords = Readonly<{
  coord1: number;
  coord2: number;
}>;

//Generates an array of angles that could be used for circular movement
export function generateAnglesForCircle(numberOfPoints: number, numberOfCircles: number = 1, startAngle: number = 0): ReadonlyArray<TRadians> {
  let angleArray: ReadonlyArray<TRadians> = [];
  const fullCircle: TRadians = (2 * Math.PI * numberOfCircles) as TRadians;
  const angleStep: TRadians = (fullCircle / numberOfPoints) as TRadians;

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i <= numberOfPoints; i++) {
    angleArray = [...angleArray, (startAngle + i * angleStep) as TRadians];
  }

  return angleArray;
}

// Generates coords for circular movement
function createCirclePath(angleArray: ReadonlyArray<TRadians>, radius: TMeters, circleCenter: TTempCoords): ReadonlyArray<TTempCoords> {
  return angleArray.map((angle: TRadians) => {
    return {
      coord1: Math.cos(angle) * radius + circleCenter.coord1,
      coord2: Math.sin(angle) * radius + circleCenter.coord2
    };
  });
}

export function createCirclePathXY(angleArray: ReadonlyArray<TRadians>, radius: TMeters, circleCenter: Vector3): ReadonlyArray<Vector3> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.x, coord2: circleCenter.y }).map((coords: TTempCoords): Vector3 => new Vector3(coords.coord1, coords.coord2, circleCenter.z));
}

export function createCirclePathXZ(angleArray: ReadonlyArray<TRadians>, radius: TMeters, circleCenter: Vector3): ReadonlyArray<Vector3> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.x, coord2: circleCenter.z }).map((coords: TTempCoords): Vector3 => new Vector3(coords.coord1, circleCenter.y, coords.coord2));
}

export function createCirclePathYZ(angleArray: ReadonlyArray<TRadians>, radius: TMeters, circleCenter: Vector3): ReadonlyArray<Vector3> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.y, coord2: circleCenter.z }).map((coords: TTempCoords): Vector3 => new Vector3(circleCenter.x, coords.coord1, coords.coord2));
}

export function getMouseAzimuthAndElevation(mousePosition: TReadonlyVector3, playerPosition: TReadonlyVector3): Readonly<{ azimuth: TRadians; elevation: TRadians }> {
  const direction: TReadonlyVector3 = mousePosition.clone().sub(playerPosition).normalize();
  const azimuth: TRadians = getAzimuthFromDirection(direction);
  const elevation: TRadians = getElevationFromDirection(direction);

  return { azimuth, elevation };
}
