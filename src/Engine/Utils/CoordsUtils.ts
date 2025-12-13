import type { IWithCoordsXY, IWithCoordsXZ, IWithCoordsYZ } from '@/Engine/Mixins';

type ITempCoords = Readonly<{
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
function createCirclePath(angleArray: ReadonlyArray<number>, radius: number, circleCenter: ITempCoords): ReadonlyArray<ITempCoords> {
  return angleArray.map((angle: number) => {
    return {
      coord1: Math.cos(angle) * radius + circleCenter.coord1,
      coord2: Math.sin(angle) * radius + circleCenter.coord2
    };
  });
}

export function createCirclePathXY(angleArray: ReadonlyArray<number>, radius: number, circleCenter: IWithCoordsXY): ReadonlyArray<IWithCoordsXY> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.x, coord2: circleCenter.y }).map(
    (coords: ITempCoords): IWithCoordsXY => ({
      x: coords.coord1,
      y: coords.coord2
    })
  );
}

export function createCirclePathXZ(angleArray: ReadonlyArray<number>, radius: number, circleCenter: IWithCoordsXZ): ReadonlyArray<IWithCoordsXZ> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.x, coord2: circleCenter.z }).map(
    (coords: ITempCoords): IWithCoordsXZ => ({
      x: coords.coord1,
      z: coords.coord2
    })
  );
}

export function createCirclePathYZ(angleArray: ReadonlyArray<number>, radius: number, circleCenter: IWithCoordsYZ): ReadonlyArray<IWithCoordsYZ> {
  return createCirclePath(angleArray, radius, { coord1: circleCenter.y, coord2: circleCenter.z }).map(
    (coords: ITempCoords): IWithCoordsYZ => ({
      y: coords.coord1,
      z: coords.coord2
    })
  );
}
