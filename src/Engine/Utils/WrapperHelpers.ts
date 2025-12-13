import type { Material } from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { IEulerWrapper } from '@/Engine/Euler';
import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  IMaterialPackParams,
  IMaterialTexturePack,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack
} from '@/Engine/MaterialTexturePack';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d } from '@/Engine/Mixins';
import type { IWithTextures } from '@/Engine/Texture';
import type { IObject3DParams } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils/index';
import type { IVector2Wrapper, IVector3Wrapper } from '@/Engine/Vector';

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

export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IBasicMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IDepthMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IDistanceMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<INormalMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IMatcapMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<ILambertMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IPhongMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IPhysicalMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IToonMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IStandardMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: IWithTextures, pack: IMaterialPackParams<IMaterialTexturePack>): Promise<Material> {
  return obj.loadAndApplyMaterialTexturePack(pack);
}

export function applyRotation(obj: IRotatable, rotation?: IEulerWrapper): void {
  if (isDefined(rotation)) obj.setRotation(rotation.getRotationX(), rotation.getRotationY(), rotation.getRotationZ());
}

export function applyScale(obj: IScalable, scale?: IVector3Wrapper): void {
  if (isDefined(scale)) obj.setScale(scale.getX(), scale.getY(), scale.getZ());
}
