import type { PixelFormat } from 'three';
import {
  AlphaFormat,
  DepthFormat,
  DepthStencilFormat,
  LuminanceAlphaFormat,
  LuminanceFormat,
  RedFormat,
  RedIntegerFormat,
  RGBAFormat,
  RGBAIntegerFormat,
  RGBFormat,
  RGFormat,
  RGIntegerFormat
} from 'three';

import { PixelFormatName } from './PixelFormatName';

export const PixelFormatMap: Readonly<Record<PixelFormatName, PixelFormat>> = {
  [PixelFormatName.AlphaFormat]: AlphaFormat,
  [PixelFormatName.RGBFormat]: RGBFormat,
  [PixelFormatName.RGBAFormat]: RGBAFormat,
  [PixelFormatName.LuminanceFormat]: LuminanceFormat,
  [PixelFormatName.LuminanceAlphaFormat]: LuminanceAlphaFormat,
  [PixelFormatName.DepthFormat]: DepthFormat,
  [PixelFormatName.DepthStencilFormat]: DepthStencilFormat,
  [PixelFormatName.RedFormat]: RedFormat,
  [PixelFormatName.RedIntegerFormat]: RedIntegerFormat,
  [PixelFormatName.RGFormat]: RGFormat,
  [PixelFormatName.RGIntegerFormat]: RGIntegerFormat,
  [PixelFormatName.RGBAIntegerFormat]: RGBAIntegerFormat
};
