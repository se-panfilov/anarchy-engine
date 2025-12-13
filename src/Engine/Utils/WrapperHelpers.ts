import type { Material } from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { TEulerWrapper } from '@/Engine/Euler';
import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  TMaterialPackParams,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack,
  TMaterialTexturePack
} from '@/Engine/MaterialTexturePack';
import type { TScalable, TMovable3dXYZ, TRotatable, TWithObject3d } from '@/Engine/Mixins';
import type { TWithTextures } from '@/Engine/Texture';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils/index';
import type { TVector2Wrapper, TVector3Wrapper } from '@/Engine/Vector';

export function applyObject3dParams(obj: TWithObject3d, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<TObject3DParams>): void {
  if (isDefined(visible)) obj.setVisible(visible);
  if (isDefined(castShadow)) obj.setCastShadow(castShadow);
  if (isDefined(receiveShadow)) obj.setReceiveShadow(receiveShadow);
  if (isDefined(frustumCulled)) obj.setFrustumCulled(frustumCulled);
  if (isDefined(renderOrder)) obj.setRenderOrder(renderOrder);
}

export function applyPosition(obj: TMovable3dXYZ, position?: TVector3Wrapper): void {
  if (isDefined(position)) obj.setPosition(position);
}

export function applyCenter(obj: CSS2DObject, center?: TVector2Wrapper): void {
  if (isDefined(center)) obj.center.set(center.getX(), center.getY());
}

export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IBasicMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IDepthMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IDistanceMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<INormalMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IMatcapMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<ILambertMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IPhongMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IPhysicalMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IToonMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<IStandardMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TMaterialTexturePack>): Promise<Material> {
  return obj.loadAndApplyMaterialTexturePack(pack);
}

export function applyRotation(obj: TRotatable, rotation?: TEulerWrapper): void {
  if (isDefined(rotation)) obj.setRotation(rotation.getRotationX(), rotation.getRotationY(), rotation.getRotationZ());
}

export function applyScale(obj: TScalable, scale?: TVector3Wrapper): void {
  if (isDefined(scale)) obj.setScale(scale.getX(), scale.getY(), scale.getZ());
}
