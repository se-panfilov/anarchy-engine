import { describe, expect, it } from 'vitest';

import { centimetersToMeters, hoursToMS, kilometersToMeters, meters, minutesToMS, secondsToMS } from './MeasurementsUtils';

describe('MeasurementsUtils', () => {
  describe('centimetersToMeters', () => {
    it('should convert centimeters to meters', () => {
      expect(centimetersToMeters(1)).toBe(0.01);
      expect(centimetersToMeters(10)).toBe(0.1);
      expect(centimetersToMeters(100)).toBe(1);
      expect(centimetersToMeters(1000)).toBe(10);
    });
  });

  describe('meters', () => {
    it('should convert meters to meters', () => {
      expect(meters(1)).toBe(1);
      expect(meters(1000)).toBe(1000);
      expect(meters(999)).toBe(999);
    });
  });

  describe('kilometersToMeters', () => {
    it('should convert kilometers to meters', () => {
      expect(kilometersToMeters(1)).toBe(1000);
      expect(kilometersToMeters(100)).toBe(100000);
      expect(kilometersToMeters(999)).toBe(999000);
    });
  });

  describe('secondsToMS', () => {
    it('should convert seconds to milliseconds', () => {
      expect(secondsToMS(1)).toBe(1000);
      expect(secondsToMS(1000)).toBe(1000000);
      expect(secondsToMS(999)).toBe(999000);
    });
  });

  describe('minutesToMS', () => {
    it('should convert minutes to milliseconds', () => {
      expect(minutesToMS(1)).toBe(60000);
      expect(minutesToMS(100)).toBe(6000000);
      expect(minutesToMS(999)).toBe(59940000);
    });
  });

  describe('hoursToMS', () => {
    it('should convert hours to milliseconds', () => {
      expect(hoursToMS(1)).toBe(3600000);
      expect(hoursToMS(100)).toBe(360000000);
      expect(hoursToMS(999)).toBe(3596400000);
    });
  });
});
