import { Vector3 } from 'three';

import type { TRadians } from '@/Engine/Math';
import { getAzimuthRadFromDirection, getElevationRadFromDirection } from '@/Engine/Math';

type TTempCoords = Readonly<{
  coord1: number;
  coord2: number;
}>;

//Generates an array of angles that could be used for circular movement
export function generateAnglesForCircle(numberOfPoints: number, numberOfCircles: number = 1, startAngle: number = 0): ReadonlyArray<number> {
  let angleArray: ReadonlyArray<number> = [];
  const fullCircle: number = 2 * Math.PI * numberOfCircles;
  const angleStep: number = fullCircle / numberOfPoints;

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i <= numberOfPoints; i++) {
    angleArray = [...angleArray, startAngle + i * angleStep];
  }

  return angleArray;
}

// Generates coords for circular movement
function createCirclePath(angleArray: ReadonlyArray<number>, radius: number, circleCenter: TTempCoords): ReadonlyArray<TTempCoords> {
  return angleArray.map((angle: number) => {
    return {
      coord1: Math.cos(angle) * radius + circleCenter.coord1,
      coord2: Math.sin(angle) * radius + circleCenter.coord2
    };
  });
}

export function createCirclePathXY(angleArray: ReadonlyArray<number>, radius: number, circleCenter: Vector3): ReadonlyArray<Vector3> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.x, coord2: circleCenter.y }).map((coords: TTempCoords): Vector3 => new Vector3(coords.coord1, coords.coord2, circleCenter.z));
}

export function createCirclePathXZ(angleArray: ReadonlyArray<number>, radius: number, circleCenter: Vector3): ReadonlyArray<Vector3> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.x, coord2: circleCenter.z }).map((coords: TTempCoords): Vector3 => new Vector3(coords.coord1, circleCenter.y, coords.coord2));
}

export function createCirclePathYZ(angleArray: ReadonlyArray<number>, radius: number, circleCenter: Vector3): ReadonlyArray<Vector3> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.y, coord2: circleCenter.z }).map((coords: TTempCoords): Vector3 => new Vector3(circleCenter.x, coords.coord1, coords.coord2));
}

export function getMouseAzimuthAndElevation(mousePosition: Vector3, playerPosition: Vector3): Readonly<{ azimuth: TRadians; elevation: TRadians }> {
  const direction: Vector3 = mousePosition.clone().sub(playerPosition).normalize();
  const azimuth: TRadians = getAzimuthRadFromDirection(direction);
  const elevation: TRadians = getElevationRadFromDirection(direction);

  return { azimuth, elevation };
}
