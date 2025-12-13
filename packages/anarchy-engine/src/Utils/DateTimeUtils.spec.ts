import { enUS } from 'date-fns/locale';
import { describe, expect, it } from 'vitest';

import { getDuration, toDate, toDateAndTime, toTime } from './DateTimeUtils';

describe('DateTimeUtils', () => {
  describe('getDuration', () => {
    it('should return "0 minutes"', () => {
      expect(getDuration(0, 'en')).toBe('0 minutes');
    });

    it('should return "1 minute"', () => {
      expect(getDuration(1, 'en')).toBe('1 minute');
    });

    it('should return "50 minutes"', () => {
      expect(getDuration(50, 'en')).toBe('50 minutes');
    });

    it('should return "1 hour and 40 minutes" for 99 minutes', () => {
      expect(getDuration(99, 'en')).toBe('1 hour and 39 minutes');
    });

    it('should return "2 hour and 21 minutes" for 242', () => {
      expect(getDuration(242, 'en')).toBe('4 hours and 2 minutes');
    });

    it('should return "26 hour and 4 minutes" for 8921 minutes', () => {
      expect(getDuration(8921, 'en')).toBe('148 hours and 41 minutes');
    });

    it('should return "26 hour and 1 minute" for 80721', () => {
      expect(getDuration(81001, 'en')).toBe('1,350 hours and 1 minute');
    });
  });

  describe('toDate', () => {
    it('returns date in expected format', () => {
      expect(toDate('2025-10-15', enUS)).toBe('15 October 2025');
    });
  });

  describe('toTime', () => {
    it('returns date in expected format', () => {
      expect(toTime('2025-10-15', enUS)).toBe('00:00');
    });
  });

  describe('toDateAndTime', () => {
    it('returns date in expected format', () => {
      expect(toDateAndTime('2025-10-15', enUS).date).toBe('15 October 2025');
      expect(toDateAndTime('2025-10-15', enUS).time).toBe('00:00');
    });
  });
});
