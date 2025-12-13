import { EulerWrapper } from '@/Engine/Euler';
import { TextType } from '@/Engine/Text/Constants';
import type { IText3dWrapper, ITextParams, TText2dWrapper } from '@/Engine/Text/Models';
import { Text2dWrapper, Text3dWrapper } from '@/Engine/Text/Wrappers';
import { Vector3Wrapper } from '@/Engine/Vector';

import { isText2dWrapper, isText3dWrapper } from './TextUtils';

describe('TextUtils', () => {
  const textPrams: Omit<ITextParams, 'type'> = {
    text: 'VarelaRound',
    position: Vector3Wrapper({ x: -15, y: 6, z: -14 }),
    rotation: EulerWrapper({ x: -1.57, y: 0, z: 0 }),
    cssProps: {
      color: '#ff0000',
      fontSize: '0.2rem',
      fontFamily: '"VarelaRound", sans-serif'
    },
    tags: []
  };

  const text2dWrapper: TText2dWrapper = Text2dWrapper({ ...textPrams, type: TextType.Text2d });
  const text3dWrapper: IText3dWrapper = Text3dWrapper({ ...textPrams, type: TextType.Text3d });

  describe('isText2dWrapper', () => {
    it('should return "true" for 2d text', () => {
      expect(isText2dWrapper(text2dWrapper)).toBe(true);
    });

    it('should return "false" for 3d text', () => {
      expect(isText2dWrapper(text3dWrapper)).toBe(false);
    });
  });

  describe('isText3dWrapper', () => {
    it('should return "false" for 2d text', () => {
      expect(isText3dWrapper(text2dWrapper)).toBe(false);
    });

    it('should return "true" for 3d text', () => {
      expect(isText3dWrapper(text3dWrapper)).toBe(true);
    });
  });
});
