import type { Material } from 'three';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import type { TEulerWrapper } from '@/Engine/Euler';
import type {
  TBasicMaterialTexturePack,
  TDepthMaterialTexturePack,
  TDistanceMaterialTexturePack,
  TLambertMaterialTexturePack,
  TMatcapMaterialTexturePack,
  TMaterialPackParams,
  TMaterialTexturePack,
  TNormalMaterialTexturePack,
  TPhongMaterialTexturePack,
  TPhysicalMaterialTexturePack,
  TStandardMaterialTexturePack,
  TToonMaterialTexturePack
} from '@/Engine/MaterialTexturePack';
import type { TMovable3dXYZ, TRotatable, TScalable, TWithObject3d } from '@/Engine/Mixins';
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

export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TBasicMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TDepthMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TDistanceMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TNormalMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TMatcapMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TLambertMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TPhongMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TPhysicalMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TToonMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TStandardMaterialTexturePack>): Promise<Material>;
export function applyTexturePack(obj: TWithTextures, pack: TMaterialPackParams<TMaterialTexturePack>): Promise<Material> {
  return obj.loadAndApplyMaterialTexturePack(pack);
}

export function applyRotation(obj: TRotatable, rotation?: TEulerWrapper): void {
  if (isDefined(rotation)) obj.setRotation(rotation.getRotationX(), rotation.getRotationY(), rotation.getRotationZ());
}

export function applyScale(obj: TScalable, scale?: TVector3Wrapper): void {
  if (isDefined(scale)) obj.setScale(scale.getX(), scale.getY(), scale.getZ());
}
