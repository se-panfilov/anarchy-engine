import { Euler } from 'three';
import { Vector3 } from 'three/src/math/Vector3';

import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';
import { TextType } from '@/Engine/Text/Constants';
import type { TText2dWrapper, TText3dWrapper, TTextDependencies, TTextParams } from '@/Engine/Text/Models';
import { Text2dWrapper, Text3dWrapper } from '@/Engine/Text/Wrappers';

import { isText2dWrapper, isText3dWrapper } from './TextUtils';

describe('TextUtils', () => {
  const textPrams: Omit<TTextParams, 'type'> = {
    text: 'VarelaRound',
    position: new Vector3(-15, 6, -14),
    rotation: new Euler(-1.57, 0, 0),
    cssProps: {
      color: '#ff0000',
      fontSize: '0.2rem',
      fontFamily: '"VarelaRound", sans-serif'
    },
    tags: []
  };

  const dependencies: TTextDependencies = {
    kinematicLoopService: vi.fn() as any as TKinematicLoopService,
    physicsBodyService: vi.fn() as any as TPhysicsBodyService,
    physicsLoopService: vi.fn() as any as TPhysicsLoopService
  };

  const text2dWrapper: TText2dWrapper = Text2dWrapper({ ...textPrams, type: TextType.Text2d }, dependencies);
  const text3dWrapper: TText3dWrapper = Text3dWrapper({ ...textPrams, type: TextType.Text3d }, dependencies);

  describe('isText2dWrapper', () => {
    it('should return "true" for 2d text', () => {
      expect(isText2dWrapper(text2dWrapper)).toBe(true);
    });

    it('should return "false" for 3d text', () => {
      expect(isText2dWrapper(text3dWrapper)).toBe(false);
    });
  });

  describe('isText3dWrapper', () => {
    it('should return "false" for 2d text', () => {
      expect(isText3dWrapper(text2dWrapper)).toBe(false);
    });

    it('should return "true" for 3d text', () => {
      expect(isText3dWrapper(text3dWrapper)).toBe(true);
    });
  });
});
