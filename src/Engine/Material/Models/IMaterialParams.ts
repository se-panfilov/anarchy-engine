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

import type { IVector2, IVector3 } from '@/Engine/Vector';

export type IAbstractMaterialParams = Readonly<{
  alphaHash?: boolean;
  alphaTest?: number;
  alphaToCoverage?: boolean;
  blendAlpha?: number;
  blendColor?: ColorRepresentation;
  blendDst?: BlendingDstFactor;
  blendDstAlpha?: number;
  blendEquation?: BlendingEquation;
  blendEquationAlpha?: number;
  blending?: Blending;
  blendSrc?: BlendingSrcFactor | BlendingDstFactor;
  blendSrcAlpha?: number;
  clipIntersection?: boolean;
  // clippingPlanes?: Plane[];
  clipShadows?: boolean;
  colorWrite?: boolean;
  defines?: any;
  depthFunc?: DepthModes;
  depthTest?: boolean;
  depthWrite?: boolean;
  name?: string;
  opacity?: number;
  polygonOffset?: boolean;
  polygonOffsetFactor?: number;
  polygonOffsetUnits?: number;
  precision?: 'highp' | 'mediump' | 'lowp';
  premultipliedAlpha?: boolean;
  forceSinglePass?: boolean;
  dithering?: boolean;
  side?: Side;
  shadowSide?: Side;
  toneMapped?: boolean;
  transparent?: boolean;
  vertexColors?: boolean;
  visible?: boolean;
  format?: PixelFormat;
  stencilWrite?: boolean;
  stencilFunc?: StencilFunc;
  stencilRef?: number;
  stencilWriteMask?: number;
  stencilFuncMask?: number;
  stencilFail?: StencilOp;
  stencilZFail?: StencilOp;
  stencilZPass?: StencilOp;
  userData?: Record<string, any>;
}>;

export type IBasicMaterialParams = IAbstractMaterialParams &
  Readonly<{
    color?: ColorRepresentation;
    opacity?: number;
    lightMapIntensity?: number;
    aoMapIntensity?: number;
    fog?: boolean;
    combine?: Combine;
    reflectivity?: number;
    refractionRatio?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
  }>;

export type IDepthMaterialParams = IAbstractMaterialParams &
  Readonly<{
    depthPacking?: DepthPackingStrategies;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type IDistanceMaterialParams = IAbstractMaterialParams &
  Readonly<{
    displacementScale?: number;
    displacementBias?: number;
    farDistance?: number;
    nearDistance?: number;
    referencePosition?: IVector3;
  }>;

export type INormalMaterialParams = IAbstractMaterialParams &
  Readonly<{
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: IVector2;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type IMatcapMaterialParams = IAbstractMaterialParams &
  Readonly<{
    color?: ColorRepresentation;
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: IVector2;
    displacementScale?: number;
    displacementBias?: number;
    fog?: boolean;
    flatShading?: boolean;
  }>;

export type ILambertMaterialParams = IAbstractMaterialParams &
  Readonly<{
    bumpScale?: number;
    color?: ColorRepresentation;
    displacementScale?: number;
    displacementBias?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    flatShading?: boolean;
    lightMapIntensity?: number;
    normalScale?: IVector2;
    aoMapIntensity?: number;
    combine?: Combine;
    reflectivity?: number;
    refractionRatio?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    fog?: boolean;
  }>;

export type IPhongMaterialParams = IAbstractMaterialParams &
  Readonly<{
    color?: ColorRepresentation;
    specular?: ColorRepresentation;
    shininess?: number;
    opacity?: number;
    lightMapIntensity?: number;
    aoMapIntensity?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: IVector2;
    displacementScale?: number;
    displacementBias?: number;
    combine?: Combine;
    reflectivity?: number;
    refractionRatio?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    fog?: boolean;
    flatShading?: boolean;
  }>;

export type IToonMaterialParams = IAbstractMaterialParams &
  Readonly<{
    color?: ColorRepresentation;
    opacity?: number;
    lightMapIntensity?: number;
    aoMapIntensity?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: IVector2;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    fog?: boolean;
  }>;

export type IStandardMaterialParams = IAbstractMaterialParams &
  Readonly<{
    color?: ColorRepresentation;
    roughness?: number;
    metalness?: number;
    lightMapIntensity?: number;
    aoMapIntensity?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: IVector2;
    displacementScale?: number;
    displacementBias?: number;
    envMapIntensity?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    fog?: boolean;
    flatShading?: boolean;
  }>;

export type IPhysicalMaterialParams = IStandardMaterialParams &
  Readonly<{
    clearcoat?: number;
    clearcoatRoughness?: number;
    clearcoatNormalScale?: IVector2;
    reflectivity?: number;
    ior?: number;
    sheen?: number;
    sheenColor?: ColorRepresentation;
    sheenRoughness?: number;
    transmission?: number;
    thickness?: number;
    attenuationDistance?: number;
    attenuationColor?: ColorRepresentation;
    specularIntensity?: number;
    specularColor?: ColorRepresentation;
    iridescenceIOR?: number;
    iridescence?: number;
    iridescenceThicknessRange?: [number, number];
    anisotropy?: number;
    anisotropyRotation?: number;
  }>;

export type IMaterialParams =
  | IBasicMaterialParams
  | IDepthMaterialParams
  | IDistanceMaterialParams
  | INormalMaterialParams
  | IMatcapMaterialParams
  | ILambertMaterialParams
  | IPhongMaterialParams
  | IPhysicalMaterialParams
  | IToonMaterialParams
  | IStandardMaterialParams;
