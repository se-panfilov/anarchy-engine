import { WrapperType } from '@/Engine/Abstract';
import { TextType } from '@/Engine/Text';

import { getWrapperTypeByTextType } from './TextWrapperHelper';

describe('TextWrapperHelper', () => {
  it('should return Text2d', () => {
    expect(getWrapperTypeByTextType(TextType.Text2d)).toEqual(WrapperType.Text2d);
  });

  it('should return Text3d', () => {
    expect(getWrapperTypeByTextType(TextType.Text3d)).toEqual(WrapperType.Text3d);
  });

  it('should throw an error', () => {
    expect(() => getWrapperTypeByTextType('whatever' as TextType)).toThrow();
  });
});
