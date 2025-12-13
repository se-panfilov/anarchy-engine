import { MathUtils } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

import { degrees } from '@/Engine/Measurements/Utils';

import { getPushCoordsFrom3dAzimuthDeg } from './PhysicsMovementUtils';

describe('PhysicsMovementUtils', () => {
  describe('getPushCoordsFrom3dAzimuth', () => {
    it('should return correct vector for azimuth 0, elevation 0, force 1', () => {
      const result: Vector3 = getPushCoordsFrom3dAzimuthDeg(degrees(0), degrees(0), degrees(1));
      expect(result).toEqual({ x: 1, y: 0, z: 0 });
    });

    it('should return correct vector for azimuth 90, elevation 0, force 1', () => {
      const result: Vector3 = getPushCoordsFrom3dAzimuthDeg(degrees(90), degrees(0), degrees(1));
      expect(result.x).toBeCloseTo(0);
      expect(result.y).toBe(0);
      expect(result.z).toBe(1);
    });

    it('should return correct vector for azimuth 0, elevation 90, force 1', () => {
      const result: Vector3 = getPushCoordsFrom3dAzimuthDeg(degrees(0), degrees(90), degrees(1));
      expect(result.x).toBeCloseTo(0);
      expect(result.y).toBe(1);
      expect(result.z).toBe(0);
    });

    it('should return correct vector for azimuth 45, elevation 45, force 1', () => {
      const result: Vector3 = getPushCoordsFrom3dAzimuthDeg(degrees(45), degrees(45), degrees(1));
      const sqrt2Over2 = Math.sqrt(2) / 2;
      expect(result.x).toBeCloseTo(sqrt2Over2 / Math.sqrt(2));
      expect(result.y).toBeCloseTo(sqrt2Over2);
      expect(result.z).toBeCloseTo(sqrt2Over2 / Math.sqrt(2));
    });

    it('should return correct vector for azimuth 230, elevation 45, force 2', () => {
      const result: Vector3 = getPushCoordsFrom3dAzimuthDeg(degrees(230), degrees(45), degrees(2));
      const expected = {
        x: 2 * Math.cos(MathUtils.degToRad(45)) * Math.cos(MathUtils.degToRad(230)),
        y: 2 * Math.cos(MathUtils.degToRad(45)) * Math.sin(MathUtils.degToRad(230)),
        z: 2 * Math.sin(MathUtils.degToRad(45))
      };
      expect(result.x).toBeCloseTo(expected.x);
      expect(result.y).toBeCloseTo(expected.z);
      expect(result.z).toBeCloseTo(expected.y);
    });
  });
});
