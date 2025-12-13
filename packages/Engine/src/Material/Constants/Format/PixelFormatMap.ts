import type { PixelFormat } from 'three';
import { AlphaFormat, DepthFormat, DepthStencilFormat, RedFormat, RedIntegerFormat, RGBAFormat, RGBAIntegerFormat, RGBFormat, RGBIntegerFormat, RGFormat, RGIntegerFormat } from 'three';

import { PixelFormatName } from './PixelFormatName';

export const PixelFormatMap: Readonly<Record<PixelFormatName, PixelFormat>> = {
  [PixelFormatName.AlphaFormat]: AlphaFormat,
  [PixelFormatName.DepthFormat]: DepthFormat,
  [PixelFormatName.DepthStencilFormat]: DepthStencilFormat,
  [PixelFormatName.RGBAFormat]: RGBAFormat,
  [PixelFormatName.RGBAIntegerFormat]: RGBAIntegerFormat,
  [PixelFormatName.RGBFormat]: RGBFormat,
  [PixelFormatName.RGBIntegerFormat]: RGBIntegerFormat,
  [PixelFormatName.RGFormat]: RGFormat,
  [PixelFormatName.RGIntegerFormat]: RGIntegerFormat,
  [PixelFormatName.RedFormat]: RedFormat,
  [PixelFormatName.RedIntegerFormat]: RedIntegerFormat
};
