import { Vector3 } from 'three/src/math/Vector3';
import { describe, expect, it } from 'vitest';

import { getDistance } from './DistanceUtils';

describe('DistanceUtils', () => {
  describe('getDistance', () => {
    it('should return 0', () => {
      const pointA: Vector3 = new Vector3(0, 0, 0);
      const pointB: Vector3 = new Vector3(0, 0, 0);
      expect(getDistance(pointA, pointB)).toBe(0);
    });

    describe('move by straight lines', () => {
      describe('move by x', () => {
        it('should return 1', () => {
          const pointA: Vector3 = new Vector3(0, 0, 0);
          const pointB: Vector3 = new Vector3(1, 0, 0);
          expect(getDistance(pointA, pointB)).toBe(1);
        });

        it('should return 50', () => {
          const pointA: Vector3 = new Vector3(50, 0, 0);
          const pointB: Vector3 = new Vector3(100, 0, 0);
          expect(getDistance(pointA, pointB)).toBe(50);
        });

        it('should return 150', () => {
          const pointA: Vector3 = new Vector3(-50, 0, 0);
          const pointB: Vector3 = new Vector3(100, 0, 0);
          expect(getDistance(pointA, pointB)).toBe(150);
        });
      });

      describe('move by y', () => {
        it('should return 1', () => {
          const pointA: Vector3 = new Vector3(0, 0, 0);
          const pointB: Vector3 = new Vector3(0, 1, 0);
          expect(getDistance(pointA, pointB)).toBe(1);
        });

        it('should return 50', () => {
          const pointA: Vector3 = new Vector3(0, 50, 0);
          const pointB: Vector3 = new Vector3(0, 100, 0);
          expect(getDistance(pointA, pointB)).toBe(50);
        });

        it('should return 150', () => {
          const pointA: Vector3 = new Vector3(0, -50, 0);
          const pointB: Vector3 = new Vector3(0, 100, 0);
          expect(getDistance(pointA, pointB)).toBe(150);
        });
      });

      describe('move by z', () => {
        it('should return 1', () => {
          const pointA: Vector3 = new Vector3(0, 0, 0);
          const pointB: Vector3 = new Vector3(0, 0, 1);
          expect(getDistance(pointA, pointB)).toBe(1);
        });

        it('should return 50', () => {
          const pointA: Vector3 = new Vector3(0, 0, 50);
          const pointB: Vector3 = new Vector3(0, 0, 100);
          expect(getDistance(pointA, pointB)).toBe(50);
        });

        it('should return 150', () => {
          const pointA: Vector3 = new Vector3(0, 0, -50);
          const pointB: Vector3 = new Vector3(0, 0, 100);
          expect(getDistance(pointA, pointB)).toBe(150);
        });
      });
    });

    describe('move by XY diagonal', () => {
      it('should return 1', () => {
        const pointA: Vector3 = new Vector3(0, 0, 0);
        const pointB: Vector3 = new Vector3(0, 1, 0);
        expect(getDistance(pointA, pointB)).toBe(1);
      });

      it('should return 50', () => {
        const pointA: Vector3 = new Vector3(0, 0, 0);
        const pointB: Vector3 = new Vector3(0, 50, 0);
        expect(getDistance(pointA, pointB)).toBe(50);
      });

      it('should return 150', () => {
        const pointA: Vector3 = new Vector3(-50, 0, 0);
        const pointB: Vector3 = new Vector3(0, 100, 0);
        expect(getDistance(pointA, pointB)).toBe(111.80339887498948);
        // expect(getDistance(Vector3Wrapper(pointA), Vector3Wrapper(pointB))).toBe(150); //111.80339887498948
      });
    });

    describe('move by XZ diagonal', () => {
      it('should return ±11', () => {
        const pointA: Vector3 = new Vector3(-10, 0, 0);
        const pointB: Vector3 = new Vector3(0, 0, 1);
        expect(getDistance(pointA, pointB)).toBe(10.04987562112089);
      });

      it('should return 50', () => {
        const pointA: Vector3 = new Vector3(0, 0, 0);
        const pointB: Vector3 = new Vector3(0, 0, 50);
        expect(getDistance(pointA, pointB)).toBe(50);
      });

      it('should return 150', () => {
        const pointA: Vector3 = new Vector3(-50, 0, 0);
        const pointB: Vector3 = new Vector3(0, 0, 100);
        expect(getDistance(pointA, pointB)).toBe(111.80339887498948);
      });
    });

    describe('move by YZ diagonal', () => {
      it('should return ±51', () => {
        const pointA: Vector3 = new Vector3(0, -50, 0);
        const pointB: Vector3 = new Vector3(0, 0, 10);
        expect(getDistance(pointA, pointB)).toBe(50.99019513592785);
      });

      it('should return ±51', () => {
        const pointA: Vector3 = new Vector3(0, -10, 0);
        const pointB: Vector3 = new Vector3(0, 0, 50);
        expect(getDistance(pointA, pointB)).toBe(50.99019513592785);
      });

      it('should return 150', () => {
        const pointA: Vector3 = new Vector3(0, -50, 0);
        const pointB: Vector3 = new Vector3(0, 0, 100);
        expect(getDistance(pointA, pointB)).toBe(111.80339887498948);
      });
    });
  });
});
