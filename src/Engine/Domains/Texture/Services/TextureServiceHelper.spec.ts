import { describe, it } from 'vitest';

import { MaterialType } from '@/Engine/Domains/Material';
import type { ITexturePackParams } from '@/Engine/Domains/Texture/Models';
import { isMaterialType } from '@/Engine/Domains/Texture/Services/TextureServiceHelper';

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
});
