import type { Vector2 } from 'three';
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
import type { Vector3 } from 'three/src/math/Vector3';

import type { TTexture } from '@/Engine/Texture/Models';

export type TAbstractMaterialPropsOptions = Readonly<{
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

export type TBasicMaterialPropsOptions = TAbstractMaterialPropsOptions &
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

export type TDepthMaterialPropsOptions = TAbstractMaterialPropsOptions &
  Readonly<{
    depthPacking?: DepthPackingStrategies;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type TDistanceMaterialPropsOptions = TAbstractMaterialPropsOptions &
  Readonly<{
    displacementScale?: number;
    displacementBias?: number;
    farDistance?: number;
    nearDistance?: number;
    referencePosition?: Vector3;
  }>;

export type TNormalMaterialPropsOptions = TAbstractMaterialPropsOptions &
  Readonly<{
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: Vector2;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type TMatcapMaterialPropsOptions = TAbstractMaterialPropsOptions &
  Readonly<{
    color?: ColorRepresentation;
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: TVector2;
    displacementScale?: number;
    displacementBias?: number;
    fog?: boolean;
    flatShading?: boolean;
  }>;

export type TLambertMaterialPropsOptions = TAbstractMaterialPropsOptions &
  Readonly<{
    bumpScale?: number;
    color?: ColorRepresentation;
    displacementScale?: number;
    displacementBias?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    flatShading?: boolean;
    lightMapIntensity?: number;
    normalScale?: Vector2;
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

export type TPhongMaterialPropsOptions = TAbstractMaterialPropsOptions &
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
    normalScale?: Vector2;
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

export type TToonMaterialPropsOptions = TAbstractMaterialPropsOptions &
  Readonly<{
    color?: ColorRepresentation;
    opacity?: number;
    lightMapIntensity?: number;
    aoMapIntensity?: number;
    emissive?: ColorRepresentation;
    emissiveIntensity?: number;
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: Vector2;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    wireframeLinecap?: string;
    wireframeLinejoin?: string;
    fog?: boolean;
  }>;

export type TStandardMaterialPropsOptions = TAbstractMaterialPropsOptions &
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
    normalScale?: Vector2;
    displacementScale?: number;
    displacementBias?: number;
    envMapIntensity?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
    fog?: boolean;
    flatShading?: boolean;
  }>;

export type TPhysicalMaterialPropsOptions = TStandardMaterialPropsOptions &
  Readonly<{
    clearcoat?: number;
    clearcoatRoughness?: number;
    clearcoatNormalScale?: Vector2;
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

export type TPointsMaterialPropsOptions = TAbstractMaterialPropsOptions &
  Readonly<{
    color: ColorRepresentation;
    map?: TTexture | null;
    alphaMap?: TTexture | null;
    size?: number;
    sizeAttenuation?: boolean;
    fog?: boolean;
  }>;

export type TMaterialPropsOptions =
  | TBasicMaterialPropsOptions
  | TDepthMaterialPropsOptions
  | TDistanceMaterialPropsOptions
  | TNormalMaterialPropsOptions
  | TMatcapMaterialPropsOptions
  | TLambertMaterialPropsOptions
  | TPhongMaterialPropsOptions
  | TPhysicalMaterialPropsOptions
  | TToonMaterialPropsOptions
  | TStandardMaterialPropsOptions
  | TPointsMaterialPropsOptions;
