import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IEulerWrapper } from '@/Engine/Domains/Euler';
import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  IMaterialTexturePack,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack,
  IWithTexturesActor
} from '@/Engine/Domains/Texture';
import type { IObject3DParams } from '@/Engine/Domains/ThreeLib';
import type { IVector2Wrapper, IVector3Wrapper } from '@/Engine/Domains/Vector';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils/index';

export function applyObject3dParams(obj: IWithObject3d, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<IObject3DParams>): void {
  if (isDefined(visible)) obj.setVisible(visible);
  if (isDefined(castShadow)) obj.setCastShadow(castShadow);
  if (isDefined(receiveShadow)) obj.setReceiveShadow(receiveShadow);
  if (isDefined(frustumCulled)) obj.setFrustumCulled(frustumCulled);
  if (isDefined(renderOrder)) obj.setRenderOrder(renderOrder);
}

export function applyPosition(obj: IMovable3dXYZ, position?: IVector3Wrapper): void {
  if (isDefined(position)) obj.setPosition(position);
}

export function applyCenter(obj: CSS2DObject, center?: IVector2Wrapper): void {
  if (isDefined(center)) obj.center.set(center.getX(), center.getY());
}

export function applyTexturePack(obj: IWithTexturesActor, pack: IBasicMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IDepthMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IDistanceMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: INormalMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IMatcapMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: ILambertMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IPhongMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IPhysicalMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IToonMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IStandardMaterialTexturePack): Promise<void>;
export function applyTexturePack(obj: IWithTexturesActor, pack: IMaterialTexturePack): Promise<void> {
  return obj.loadAndApplyMaterialTexturePack(pack);
}

export function applyRotation(obj: IRotatable, rotation?: IEulerWrapper): void {
  if (isDefined(rotation)) obj.setRotation(rotation.getRotationX(), rotation.getRotationY(), rotation.getRotationZ());
}

export function applyScale(obj: IScalable, scale?: IVector3Wrapper): void {
  if (isDefined(scale)) obj.setScale(scale.getX(), scale.getY(), scale.getZ());
}
