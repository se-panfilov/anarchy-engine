import type { TAbstractAsyncEntityRegistry, TAbstractEntityRegistry, TWithUserData, TWithWrapperId, TWithWrapperIdEntity } from '@Anarchy/Engine/Abstract/Models';
import type { TColorWrapper } from '@Anarchy/Engine/Color';
import type { TDestroyable, TWithPosition2dProperty, TWithPosition3dProperty, TWithPosition4dProperty, TWithPositionProperty } from '@Anarchy/Engine/Mixins';
import type { TEulerLike } from '@Anarchy/Engine/ThreeLib';
import type { TTransformDriveCompatibleEntity, TWithTransformDrive } from '@Anarchy/Engine/TransformDrive';
import { isDefined, isNotDefined, isObject } from '@Anarchy/Shared/Utils';
import type { BufferGeometry, Euler, Material, Quaternion, QuaternionLike, Vector2, Vector2Like, Vector3, Vector3Like, Vector4, Vector4Like } from 'three';
import { Color } from 'three';

export function isDestroyable(obj: unknown): obj is TDestroyable {
  return isDefined((obj as TDestroyable).destroy$);
}

export const isColorWrapper = (obj: unknown): obj is TColorWrapper => isDefined((obj as TColorWrapper).entity) && (obj as TColorWrapper).entity instanceof Color;

export const isWithUserData = (entity: any): entity is TWithUserData => isDefined((entity as TWithUserData).userData);

export const isWithWrapperIdAccessors = (entity: any): entity is TWithWrapperId => isDefined((entity as TWithWrapperId).setWrapperId) && isDefined((entity as TWithWrapperId).getWrapperId);

export function isWithWrapperId<T extends TWithUserData>(obj: unknown): obj is TWithWrapperIdEntity<T> {
  return isDefined(obj) && isObject(obj) && isDefined((obj as TWithWrapperIdEntity<T>).userData) && isDefined((obj as TWithWrapperIdEntity<T>).userData.wrapperId);
}

type TMetrics = Vector2 | Vector3 | Vector4 | Vector2Like | Vector3Like | Vector4Like | Quaternion | Euler | QuaternionLike | TEulerLike;
export const isVector2Like = (obj: TMetrics): obj is Vector2Like => isDefined(obj.x) && isDefined(obj.x) && isNotDefined((obj as Vector3).z) && isNotDefined((obj as Vector4).w);
export const isVector3Like = (obj: TMetrics): obj is Vector3Like => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as Vector3).z) && isNotDefined((obj as Vector4).w);
export const isVector4Like = (obj: TMetrics): obj is Vector4Like => isDefined(obj.x) && isDefined(obj.x) && isDefined((obj as Vector4).z) && isDefined((obj as Vector4).w);

// TODO add unit tests
export const isQuaternionLike = (obj: TMetrics): obj is QuaternionLike => isVector4Like(obj as Vector4);
// TODO add unit tests
export const isEulerLike = (obj: TMetrics): obj is Euler => isVector3Like(obj as Vector3);

export const isEntityWith2dPosition = (obj: TWithPositionProperty): obj is TWithPosition2dProperty => isVector2Like(obj.position as Vector2);
export const isEntityWith3dPosition = (obj: TWithPositionProperty): obj is TWithPosition3dProperty => isVector3Like(obj.position as Vector3);
export const isEntityWith4dPosition = (obj: TWithPositionProperty): obj is TWithPosition4dProperty => isVector4Like(obj.position as Vector4);

export const isAsyncEntityRegistry = (registry: TAbstractEntityRegistry<any> | TAbstractAsyncEntityRegistry<any>): registry is TAbstractAsyncEntityRegistry<any> =>
  isDefined((registry as TAbstractAsyncEntityRegistry<any>).findByTagsAsync) && isDefined((registry as TAbstractAsyncEntityRegistry<any>).findByTagAsync);

export const hasMaterial = (entity: unknown): entity is { material?: Material | Array<Material> | null } => isDefined((entity as any).material);

export const hasGeometry = (entity: unknown): entity is { geometry?: BufferGeometry | null } => isDefined((entity as any).geometry);

export function hasTransformDrive<T extends TTransformDriveCompatibleEntity>(entity: unknown): entity is TWithTransformDrive<T> {
  return isDefined((entity as TWithTransformDrive<T>).drive) && isDefined((entity as TWithTransformDrive<T>).driveToTargetConnector);
}
