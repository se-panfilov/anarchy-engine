import { ShapeType } from '@dimforge/rapier3d/geometry/shape';

// use ShapeType
export enum CollisionShape {
  Box = 'box',
  Cuboid = 'cuboid',
  Capsule = 'capsule',
  Trimesh = 'trimesh',
  Heightfield = 'heightfield',
  Custom = 'custom'
}
