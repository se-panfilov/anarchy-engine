import type { Vector2, Vector3 } from 'three';
import type {
  Blending,
  BlendingDstFactor,
  BlendingEquation,
  BlendingSrcFactor,
  Combine,
  DepthModes,
  DepthPackingStrategies,
  NormalMapTypes,
  PixelFormat,
  Side,
  StencilFunc,
  StencilOp
} from 'three/src/constants';
import type { ColorRepresentation } from 'three/src/math/Color';

import type { TTexture } from '@/Engine/Texture/Models';

export type TAbstractMaterialParamsOptions = Readonly<{
  // clippingPlanes?: Plane[];
  alphaHash?: boolean;
  alphaTest?: number;
  alphaToCoverage?: boolean;
  blendAlpha?: number;
  blendColor?: ColorRepresentation;
  blendDst?: BlendingDstFactor;
  blendDstAlpha?: number;
  blendEquation?: BlendingEquation;
  blendEquationAlpha?: number;
  blendSrc?: BlendingSrcFactor | BlendingDstFactor;
  blendSrcAlpha?: number;
  blending?: Blending;
  clipIntersection?: boolean;
  clipShadows?: boolean;
  colorWrite?: boolean;
  defines?: any;
  depthFunc?: DepthModes;
  depthTest?: boolean;
  depthWrite?: boolean;
  dithering?: boolean;
  forceSinglePass?: boolean;
  format?: PixelFormat;
  name?: string;
  opacity?: number;
  polygonOffset?: boolean;
  polygonOffsetFactor?: number;
  polygonOffsetUnits?: number;
  precision?: 'highp' | 'mediump' | 'lowp';
  premultipliedAlpha?: boolean;
  shadowSide?: Side;
  side?: Side;
  stencilFail?: StencilOp;
  stencilFunc?: StencilFunc;
  stencilFuncMask?: number;
  stencilRef?: number;
  stencilWrite?: boolean;
  stencilWriteMask?: number;
  stencilZFail?: StencilOp;
  stencilZPass?: StencilOp;
  toneMapped?: boolean;
  transparent?: boolean;
  userData?: Record<string, any>;
  vertexColors?: boolean;
  visible?: boolean;
}>;

export type TBasicMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    aoMapIntensity?: number;
    color?: ColorRepresentation;
    combine?: Combine;
    fog?: boolean;
    lightMapIntensity?: number;
    opacity?: number;
    reflectivity?: number;
    refractionRatio?: number;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
  }>;

export type TDepthMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    depthPacking?: DepthPackingStrategies;
    displacementBias?: number;
    displacementScale?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type TDistanceMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    displacementBias?: number;
    displacementScale?: number;
    farDistance?: number;
    nearDistance?: number;
    referencePosition?: Vector3;
  }>;

export type TNormalMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    bumpScale?: number;
    displacementBias?: number;
    displacementScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: Vector2;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type TMatcapMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    bumpScale?: number;
    color?: ColorRepresentation;
    displacementBias?: number;
    displacementScale?: number;
    flatShading?: boolean;
    fog?: boolean;
    normalMapType?: NormalMapTypes;
    normalScale?: Vector2;
  }>;

export type TLambertMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    aoMapIntensity?: number;
    bumpScale?: number;
    color?: ColorRepresentation;
    combine?: Combine;
    displacementBias?: number;
    displacementScale?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    flatShading?: boolean;
    fog?: boolean;
    lightMapIntensity?: number;
    normalScale?: Vector2;
    reflectivity?: number;
    refractionRatio?: number;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
  }>;

export type TPhongMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    aoMapIntensity?: number;
    bumpScale?: number;
    color?: ColorRepresentation;
    combine?: Combine;
    displacementBias?: number;
    displacementScale?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    flatShading?: boolean;
    fog?: boolean;
    lightMapIntensity?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: Vector2;
    opacity?: number;
    reflectivity?: number;
    refractionRatio?: number;
    shininess?: number;
    specular?: ColorRepresentation;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
  }>;

export type TToonMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    aoMapIntensity?: number;
    bumpScale?: number;
    color?: ColorRepresentation;
    displacementBias?: number;
    displacementScale?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    fog?: boolean;
    lightMapIntensity?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: Vector2;
    opacity?: number;
    wireframe?: boolean;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    wireframeLinewidth?: number;
  }>;

export type TStandardMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    aoMapIntensity?: number;
    bumpScale?: number;
    color?: ColorRepresentation;
    displacementBias?: number;
    displacementScale?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    envMapIntensity?: number;
    flatShading?: boolean;
    fog?: boolean;
    lightMapIntensity?: number;
    metalness?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: Vector2;
    roughness?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type TPhysicalMaterialParamsOptions = TStandardMaterialParamsOptions &
  Readonly<{
    anisotropy?: number;
    anisotropyRotation?: number;
    attenuationColor?: ColorRepresentation;
    attenuationDistance?: number;
    clearcoat?: number;
    clearcoatNormalScale?: Vector2;
    clearcoatRoughness?: number;
    ior?: number;
    iridescence?: number;
    iridescenceIOR?: number;
    iridescenceThicknessRange?: [number, number];
    reflectivity?: number;
    sheen?: number;
    sheenColor?: ColorRepresentation;
    sheenRoughness?: number;
    specularColor?: ColorRepresentation;
    specularIntensity?: number;
    thickness?: number;
    transmission?: number;
  }>;

export type TPointsMaterialParamsOptions = TAbstractMaterialParamsOptions &
  Readonly<{
    alphaMap?: TTexture | null;
    color: ColorRepresentation;
    fog?: boolean;
    map?: TTexture | null;
    size?: number;
    sizeAttenuation?: boolean;
  }>;

export type TMaterialParamsOptions =
  | TBasicMaterialParamsOptions
  | TDepthMaterialParamsOptions
  | TDistanceMaterialParamsOptions
  | TLambertMaterialParamsOptions
  | TMatcapMaterialParamsOptions
  | TNormalMaterialParamsOptions
  | TPhongMaterialParamsOptions
  | TPhysicalMaterialParamsOptions
  | TPointsMaterialParamsOptions
  | TStandardMaterialParamsOptions
  | TToonMaterialParamsOptions;
