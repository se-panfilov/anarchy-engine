import { MaterialType } from '@/Engine/Material';
import type { ITexturePackParams } from '@/Engine/Texture/Models';
import { isIMaterialProps, isMaterialType } from '@/Engine/Texture/Services/TextureServiceHelper';

describe('TextureServiceHelper', () => {
  describe('isMaterialType', () => {
    it('should return "true" if value is in MaterialType', () => {
      expect(isMaterialType(MaterialType.Basic)).toBe(true);
      expect(isMaterialType(MaterialType.Depth)).toBe(true);
      expect(isMaterialType(MaterialType.Distance)).toBe(true);
      expect(isMaterialType(MaterialType.Normal)).toBe(true);
      expect(isMaterialType(MaterialType.Matcap)).toBe(true);
      expect(isMaterialType(MaterialType.Lambert)).toBe(true);
      expect(isMaterialType(MaterialType.Phong)).toBe(true);
      expect(isMaterialType(MaterialType.Physical)).toBe(true);
      expect(isMaterialType(MaterialType.Toon)).toBe(true);
      expect(isMaterialType(MaterialType.Standard)).toBe(true);
    });

    it('should return "false" for a random string', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isMaterialType('some' as any)).toBe(false);
    });

    it('should return "false" for ITexturePackParams', () => {
      const pack: ITexturePackParams = { url: 'some', params: { tags: [] } };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isMaterialType(pack)).toBe(false);
    });
  });
  describe('isIMaterialProps', () => {
    it('should return "true" if value is in MaterialType', () => {
      expect(isIMaterialProps({ type: MaterialType.Basic })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Depth })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Distance })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Normal })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Matcap })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Lambert })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Phong })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Physical })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Toon })).toBe(true);
      expect(isIMaterialProps({ type: MaterialType.Standard })).toBe(true);
    });

    it('should return "false" for a random value', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isIMaterialProps({ type: 'whatever' } as any)).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isIMaterialProps({} as any)).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isIMaterialProps({ whatever: 'asd' } as any)).toBe(false);
    });

    it('should return "false" for ITexturePackParams', () => {
      const pack: ITexturePackParams = { url: 'some', params: { tags: [] } };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isIMaterialProps(pack)).toBe(false);
    });
  });
});
