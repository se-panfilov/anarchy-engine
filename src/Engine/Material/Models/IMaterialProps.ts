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

import type { ITexture } from '@/Engine/Texture/Models';
import type { IVector2, IVector3 } from '@/Engine/Vector';

export type IAbstractMaterialProps = Readonly<{
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

export type IBasicMaterialProps = IAbstractMaterialProps &
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

export type IDepthMaterialProps = IAbstractMaterialProps &
  Readonly<{
    depthPacking?: DepthPackingStrategies;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type IDistanceMaterialProps = IAbstractMaterialProps &
  Readonly<{
    displacementScale?: number;
    displacementBias?: number;
    farDistance?: number;
    nearDistance?: number;
    referencePosition?: IVector3;
  }>;

export type INormalMaterialProps = IAbstractMaterialProps &
  Readonly<{
    bumpScale?: number;
    normalMapType?: NormalMapTypes;
    normalScale?: IVector2;
    displacementScale?: number;
    displacementBias?: number;
    wireframe?: boolean;
    wireframeLinewidth?: number;
  }>;

export type IMatcapMaterialProps = IAbstractMaterialProps &
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

export type ILambertMaterialProps = IAbstractMaterialProps &
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

export type IPhongMaterialProps = IAbstractMaterialProps &
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

export type IToonMaterialProps = IAbstractMaterialProps &
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

export type IStandardMaterialProps = IAbstractMaterialProps &
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

export type IPhysicalMaterialProps = IStandardMaterialProps &
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

export type IPointsMaterialProps = IAbstractMaterialProps &
  Readonly<{
    color: ColorRepresentation;
    map?: ITexture | null;
    alphaMap?: ITexture | null;
    size?: number;
    sizeAttenuation?: boolean;
    fog?: boolean;
  }>;

export type IMaterialProps =
  | IBasicMaterialProps
  | IDepthMaterialProps
  | IDistanceMaterialProps
  | INormalMaterialProps
  | IMatcapMaterialProps
  | ILambertMaterialProps
  | IPhongMaterialProps
  | IPhysicalMaterialProps
  | IToonMaterialProps
  | IStandardMaterialProps
  | IPointsMaterialProps;
