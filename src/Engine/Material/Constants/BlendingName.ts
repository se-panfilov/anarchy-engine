import { AdditiveBlending, CustomBlending, MultiplyBlending, NoBlending, NormalBlending, SubtractiveBlending } from 'three';

export enum BlendingName {
  Normal = NormalBlending,
  Additive = AdditiveBlending,
  Subtractive = SubtractiveBlending,
  Multiply = MultiplyBlending,
  Custom = CustomBlending,
  None = NoBlending
}
