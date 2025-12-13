import {
  BlendingDstFactor,
  ConstantAlphaFactor,
  ConstantColorFactor,
  DstAlphaFactor,
  DstColorFactor,
  OneFactor,
  OneMinusConstantAlphaFactor,
  OneMinusConstantColorFactor,
  OneMinusDstAlphaFactor,
  OneMinusDstColorFactor,
  OneMinusSrcAlphaFactor,
  OneMinusSrcColorFactor,
  SrcAlphaFactor,
  SrcColorFactor,
  ZeroFactor
} from 'three/src/constants';

import { BlendingDstFactorName } from './BlendingDstFactorName';

export const BlendingDstFactorMap: Readonly<Record<BlendingDstFactorName, BlendingDstFactor>> = {
  [BlendingDstFactorName.ZeroFactor]: ZeroFactor,
  [BlendingDstFactorName.OneFactor]: OneFactor,
  [BlendingDstFactorName.SrcColorFactor]: SrcColorFactor,
  [BlendingDstFactorName.OneMinusSrcColorFactor]: OneMinusSrcColorFactor,
  [BlendingDstFactorName.SrcAlphaFactor]: SrcAlphaFactor,
  [BlendingDstFactorName.OneMinusSrcAlphaFactor]: OneMinusSrcAlphaFactor,
  [BlendingDstFactorName.DstAlphaFactor]: DstAlphaFactor,
  [BlendingDstFactorName.OneMinusDstAlphaFactor]: OneMinusDstAlphaFactor,
  [BlendingDstFactorName.DstColorFactor]: DstColorFactor,
  [BlendingDstFactorName.OneMinusDstColorFactor]: OneMinusDstColorFactor,
  [BlendingDstFactorName.ConstantColorFactor]: ConstantColorFactor,
  [BlendingDstFactorName.OneMinusConstantColorFactor]: OneMinusConstantColorFactor,
  [BlendingDstFactorName.ConstantAlphaFactor]: ConstantAlphaFactor,
  [BlendingDstFactorName.OneMinusConstantAlphaFactor]: OneMinusConstantAlphaFactor
};
