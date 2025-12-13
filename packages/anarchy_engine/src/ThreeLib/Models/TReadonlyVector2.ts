import type { Vector2 } from 'three';

// TODO Better to use Pick instead of Omit, but it is not working with ts-json-schema-generator
// We are allowing to use only immutable methods and props (if you need all methods, use .clone() first)
// export type TReadonlyVector2 = Readonly<
//   Pick<Vector3, 'x' | 'y' | 'clone' | 'length' | 'lengthSq' | 'manhattanLength' | 'distanceTo' | 'distanceToSquared' | 'manhattanDistanceTo' | 'angleTo' | 'dot' | 'equals'>
// >;

// We are allowing to use only immutable methods and props (if you need all methods, use .clone() first)
export type TReadonlyVector2 = Readonly<
  Omit<
    Vector2,
    | 'add'
    | 'addScalar'
    | 'addScaledVector'
    | 'addVectors'
    | 'applyAxisAngle'
    | 'applyEuler'
    | 'applyMatrix3'
    | 'applyMatrix4'
    | 'applyQuaternion'
    | 'ceil'
    | 'clamp'
    | 'clampLength'
    | 'clampScalar'
    | 'cross'
    | 'crossVectors'
    | 'divide'
    | 'divideScalar'
    | 'floor'
    | 'lerp'
    | 'lerpVectors'
    | 'max'
    | 'min'
    | 'multiply'
    | 'multiplyScalar'
    | 'multiplyVectors'
    | 'negate'
    | 'normalize'
    | 'project'
    | 'projectOnPlane'
    | 'projectOnVector'
    | 'reflect'
    | 'round'
    | 'roundToZero'
    | 'set'
    | 'setComponent'
    | 'setFromCylindrical'
    | 'setFromCylindricalCoords'
    | 'setFromEuler'
    | 'setFromMatrix3Column'
    | 'setFromMatrixColumn'
    | 'setFromMatrixPosition'
    | 'setFromMatrixScale'
    | 'setFromSpherical'
    | 'setFromSphericalCoords'
    | 'setLength'
    | 'setScalar'
    | 'setX'
    | 'setY'
    | 'setZ'
    | 'sub'
    | 'subScalar'
    | 'subVectors'
    | 'transformDirection'
    | 'unproject'
  >
>;
