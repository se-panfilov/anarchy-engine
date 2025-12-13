import { getFileExtension, getHumanReadableFileSize } from './FileUtils';

describe('FileUtils', () => {
  describe('getHumanReadableFileSize', () => {
    it('should convert 0 to 0 Bytes', () => {
      expect(getHumanReadableFileSize(0)).toBe('0 Bytes');
    });

    it('should convert 10 to 10 Bytes', () => {
      expect(getHumanReadableFileSize(10)).toBe('10 Bytes');
    });

    it('should convert 1000 to 1 KB', () => {
      expect(getHumanReadableFileSize(1000)).toBe('1000 Bytes');
    });

    it('should convert 1024 to 1 KB', () => {
      expect(getHumanReadableFileSize(1024)).toBe('1 KB');
    });

    it('should convert 10000 to 10 KB', () => {
      expect(getHumanReadableFileSize(10_000)).toBe('9.77 KB');
    });

    it('should convert 10240 to 10 KB', () => {
      expect(getHumanReadableFileSize(10_240)).toBe('10 KB');
    });

    it('should convert 100000 to 100 KB', () => {
      expect(getHumanReadableFileSize(100_000)).toBe('97.66 KB');
    });

    it('should convert 102400 to 100 KB', () => {
      expect(getHumanReadableFileSize(102_400)).toBe('100 KB');
    });

    it('should convert 1000000 to 100 KB', () => {
      expect(getHumanReadableFileSize(1_000_000)).toBe('976.56 KB');
    });

    it('should convert 1024000 to 100 KB', () => {
      expect(getHumanReadableFileSize(1_024_000)).toBe('1000 KB');
    });

    it('should convert 1024^2 to 1 MB', () => {
      expect(getHumanReadableFileSize(1024 ** 2)).toBe('1 MB');
    });

    it('should convert 1024^2 * 46 to 46 MB', () => {
      expect(getHumanReadableFileSize(1024 ** 2 * 46)).toBe('46 MB');
    });

    it('should convert 1024^3 to 1 GB', () => {
      expect(getHumanReadableFileSize(1024 ** 3)).toBe('1 GB');
    });

    it('should convert 1024^4 to 1 TB', () => {
      expect(getHumanReadableFileSize(1024 ** 4)).toBe('1 TB');
    });

    it('should convert 1024^4* 301 to 301 TB', () => {
      expect(getHumanReadableFileSize(1024 ** 4 * 301)).toBe('301 TB');
    });

    it('should convert 1024^5 to 1 PB', () => {
      expect(getHumanReadableFileSize(1024 ** 5)).toBe('1 PB');
    });

    it('should convert 1024^6 to 1 EB', () => {
      expect(getHumanReadableFileSize(1024 ** 6)).toBe('1 EB');
    });

    it('should convert 1024^7 to 1 ZB', () => {
      expect(getHumanReadableFileSize(1024 ** 7)).toBe('1 ZB');
    });

    it('should convert 1024^8 to 1 YB', () => {
      expect(getHumanReadableFileSize(1024 ** 8)).toBe('1 YB');
    });
  });

  describe('getFileExtension', () => {
    it('should return all extensions of DocumentFileType', () => {
      expect(getFileExtension('foo.png')).toBe('png');
      expect(getFileExtension('foo.docx')).toBe('docx');
      expect(getFileExtension('foo.rar')).toBe('rar');
    });

    it('should return an extension of a file with multiple dots', () => {
      expect(getFileExtension('roro.r__.87-65.mono')).toBe('mono');
    });

    it('should return "undefined" for a file with no extension', () => {
      expect(getFileExtension('.prettier')).toBeUndefined();
      expect(getFileExtension('foo1230')).toBeUndefined();
    });

    it('should return "undefined" for an empty file name', () => {
      expect(getFileExtension('')).toBeUndefined();
    });
  });
});
