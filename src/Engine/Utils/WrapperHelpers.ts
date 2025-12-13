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
  IToonMaterialTexturePack
} from '@/Engine/Domains/Texture';
import type { IObject3DParams } from '@/Engine/Domains/ThreeLib';
import type { IMovableXYZ, IRotatable, IScalable, IWithObject3d, IWithTexturesActor } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils/index';
import type { IEulerWrapper, IVector3Wrapper } from '@/Engine/Wrappers';

export function applyObject3dParams(obj: IWithObject3d, { visible, castShadow, receiveShadow, frustumCulled, renderOrder }: Partial<IObject3DParams>): void {
  if (isDefined(visible)) obj.setVisible(visible);
  if (isDefined(castShadow)) obj.setCastShadow(castShadow);
  if (isDefined(receiveShadow)) obj.setReceiveShadow(receiveShadow);
  if (isDefined(frustumCulled)) obj.setFrustumCulled(frustumCulled);
  if (isDefined(renderOrder)) obj.setRenderOrder(renderOrder);
}

export function applyPosition(obj: IMovableXYZ, position?: IVector3Wrapper): void {
  if (isDefined(position)) obj.setPosition(position.getX(), position.getY(), position.getZ());
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
  return obj.loadMaterialTexturePack(pack);
}

export function applyRotation(obj: IRotatable, rotation?: IEulerWrapper): void {
  if (isDefined(rotation)) obj.setRotation(rotation.getRotationX(), rotation.getRotationY(), rotation.getRotationZ());
}

export function applyScale(obj: IScalable, scale?: IVector3Wrapper): void {
  if (isDefined(scale)) obj.setScale(scale.getX(), scale.getY(), scale.getZ());
}
