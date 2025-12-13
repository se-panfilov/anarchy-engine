import { PixelFormat } from 'three';
import { PixelFormatName } from './PixelFormatName';

export const PixelFormatMap: Readonly<Record<PixelFormatName, PixelFormat>> = {
  [PixelFormatName.WWW]: EEE
};
