import { centimeters, hours, kilometers, meters, minutes, seconds } from './MeasurementsUtils';

describe('MeasurementsUtils', () => {
  describe('centimeters', () => {
    it('should convert centimeters to meters', () => {
      expect(centimeters(1)).toBe(0.01);
      expect(centimeters(10)).toBe(0.1);
      expect(centimeters(100)).toBe(1);
      expect(centimeters(1000)).toBe(10);
    });
  });

  describe('meters', () => {
    it('should convert meters to meters', () => {
      expect(meters(1)).toBe(1);
      expect(meters(1000)).toBe(1000);
      expect(meters(999)).toBe(999);
    });
  });

  describe('kilometers', () => {
    it('should convert kilometers to meters', () => {
      expect(kilometers(1)).toBe(1000);
      expect(kilometers(100)).toBe(100000);
      expect(kilometers(999)).toBe(999000);
    });
  });

  describe('Seconds', () => {
    it('should convert seconds to milliseconds', () => {
      expect(seconds(1)).toBe(1000);
      expect(seconds(1000)).toBe(1000000);
      expect(seconds(999)).toBe(999000);
    });
  });

  describe('minutes', () => {
    it('should convert minutes to milliseconds', () => {
      expect(minutes(1)).toBe(60000);
      expect(minutes(100)).toBe(6000000);
      expect(minutes(999)).toBe(59940000);
    });
  });

  describe('hours', () => {
    it('should convert hours to milliseconds', () => {
      expect(hours(1)).toBe(3600000);
      expect(hours(100)).toBe(360000000);
      expect(hours(999)).toBe(3596400000);
    });
  });
});
