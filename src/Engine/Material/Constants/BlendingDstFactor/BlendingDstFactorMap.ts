import type { BlendingDstFactor } from 'three';
import {
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
} from 'three';

import { BlendingDstFactorName } from './BlendingDstFactorName';

export const BlendingDstFactorMap: Readonly<Record<BlendingDstFactorName, BlendingDstFactor>> = {
  [BlendingDstFactorName.ConstantAlphaFactor]: ConstantAlphaFactor,
  [BlendingDstFactorName.ConstantColorFactor]: ConstantColorFactor,
  [BlendingDstFactorName.DstAlphaFactor]: DstAlphaFactor,
  [BlendingDstFactorName.DstColorFactor]: DstColorFactor,
  [BlendingDstFactorName.OneFactor]: OneFactor,
  [BlendingDstFactorName.OneMinusConstantAlphaFactor]: OneMinusConstantAlphaFactor,
  [BlendingDstFactorName.OneMinusConstantColorFactor]: OneMinusConstantColorFactor,
  [BlendingDstFactorName.OneMinusDstAlphaFactor]: OneMinusDstAlphaFactor,
  [BlendingDstFactorName.OneMinusDstColorFactor]: OneMinusDstColorFactor,
  [BlendingDstFactorName.OneMinusSrcAlphaFactor]: OneMinusSrcAlphaFactor,
  [BlendingDstFactorName.OneMinusSrcColorFactor]: OneMinusSrcColorFactor,
  [BlendingDstFactorName.SrcAlphaFactor]: SrcAlphaFactor,
  [BlendingDstFactorName.SrcColorFactor]: SrcColorFactor,
  [BlendingDstFactorName.ZeroFactor]: ZeroFactor
};
