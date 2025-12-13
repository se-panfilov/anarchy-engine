import { MaterialType } from '@/Engine/Material';
import type { TTexturePackParams } from '@/Engine/MaterialTexturePack';
import { isMaterialProps, isMaterialType } from '@/Engine/Texture/Services/TextureServiceHelper';

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
      const pack: TTexturePackParams = { url: 'some', params: { tags: [] } };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isMaterialType(pack)).toBe(false);
    });
  });
  describe('isMaterialProps', () => {
    it('should return "true" if value is in MaterialType', () => {
      expect(isMaterialProps({ type: MaterialType.Basic })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Depth })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Distance })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Normal })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Matcap })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Lambert })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Phong })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Physical })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Toon })).toBe(true);
      expect(isMaterialProps({ type: MaterialType.Standard })).toBe(true);
    });

    it('should return "false" for a random value', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isMaterialProps({ type: 'whatever' } as any)).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isMaterialProps({} as any)).toBe(false);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isMaterialProps({ whatever: 'asd' } as any)).toBe(false);
    });

    it('should return "false" for ITexturePackParams', () => {
      const pack: TTexturePackParams = { url: 'some', params: { tags: [] } };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(isMaterialProps(pack)).toBe(false);
    });
  });
});
