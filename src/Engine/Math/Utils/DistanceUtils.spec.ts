import { expect } from 'vitest';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';

import { getDistancePrecisely } from './DistanceUtils';

describe('DistanceUtils', () => {
  describe('getDistancePrecisely', () => {
    it('should return 0', () => {
      const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
      const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
      expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(0);
    });

    describe('move by straight lines', () => {
      describe('move by x', () => {
        it('should return 1', () => {
          const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
          const pointB: TWithCoordsXYZ = { x: 1, y: 0, z: 0 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(1);
        });

        it('should return 50', () => {
          const pointA: TWithCoordsXYZ = { x: 50, y: 0, z: 0 };
          const pointB: TWithCoordsXYZ = { x: 100, y: 0, z: 0 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(50);
        });

        it('should return 150', () => {
          const pointA: TWithCoordsXYZ = { x: -50, y: 0, z: 0 };
          const pointB: TWithCoordsXYZ = { x: 100, y: 0, z: 0 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(150);
        });
      });

      describe('move by y', () => {
        it('should return 1', () => {
          const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
          const pointB: TWithCoordsXYZ = { x: 0, y: 1, z: 0 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(1);
        });

        it('should return 50', () => {
          const pointA: TWithCoordsXYZ = { x: 0, y: 50, z: 0 };
          const pointB: TWithCoordsXYZ = { x: 0, y: 100, z: 0 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(50);
        });

        it('should return 150', () => {
          const pointA: TWithCoordsXYZ = { x: 0, y: -50, z: 0 };
          const pointB: TWithCoordsXYZ = { x: 0, y: 100, z: 0 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(150);
        });
      });

      describe('move by z', () => {
        it('should return 1', () => {
          const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
          const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 1 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(1);
        });

        it('should return 50', () => {
          const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 50 };
          const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 100 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(50);
        });

        it('should return 150', () => {
          const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: -50 };
          const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 100 };
          expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(150);
        });
      });
    });

    describe('move by XY diagonal', () => {
      it('should return 1', () => {
        const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 1, z: 0 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(1);
      });

      it('should return 50', () => {
        const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 50, z: 0 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(50);
      });

      it('should return 150', () => {
        const pointA: TWithCoordsXYZ = { x: -50, y: 0, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 100, z: 0 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(111.80339887498948);
        // expect(getDistance(Vector3Wrapper(pointA), Vector3Wrapper(pointB))).toBe(150); //111.80339887498948
      });
    });

    describe('move by XZ diagonal', () => {
      it('should return ±11', () => {
        const pointA: TWithCoordsXYZ = { x: -10, y: 0, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 1 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(10.04987562112089);
      });

      it('should return 50', () => {
        const pointA: TWithCoordsXYZ = { x: 0, y: 0, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 50 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(50);
      });

      it('should return 150', () => {
        const pointA: TWithCoordsXYZ = { x: -50, y: 0, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 100 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(111.80339887498948);
      });
    });

    describe('move by YZ diagonal', () => {
      it('should return ±51', () => {
        const pointA: TWithCoordsXYZ = { x: 0, y: -50, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 10 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(50.99019513592785);
      });

      it('should return ±51', () => {
        const pointA: TWithCoordsXYZ = { x: 0, y: -10, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 50 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(50.99019513592785);
      });

      it('should return 150', () => {
        const pointA: TWithCoordsXYZ = { x: 0, y: -50, z: 0 };
        const pointB: TWithCoordsXYZ = { x: 0, y: 0, z: 100 };
        expect(getDistancePrecisely(pointA, pointB).toNumber()).toBe(111.80339887498948);
      });
    });
  });
});
