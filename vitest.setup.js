import { vi } from 'vitest';

//Mock "isWebGLAvailable" and "isWebGL2Available" globally (webgl is not available in unit tests)
vi.mock('@/Engine/Utils', async () => {
  const actual = await vi.importActual('@/Engine/Utils');
  return {
    ...actual,
    isWebGLAvailable: () => true,
    isWebGL2Available: () => true
  };
});

//Mock "MockWebGLRenderer" globally (webgl is not available in unit tests)
vi.mock('three', async () => {
  const actual = await vi.importActual('three');

  class MockWebGLRenderer {
    domElement = document.createElement('canvas');
    setSize = vi.fn();
    render = vi.fn();
    dispose = vi.fn();
    setPixelRatio = vi.fn();
    shadowMap = {};
    getContext = vi.fn(() => ({
      getContextAttributes: vi.fn(() => ({}))
    }));
  }

  return {
    ...actual,
    WebGLRenderer: MockWebGLRenderer
  };
});

class MockAudioContext {
  constructor() {}

  createGain = vi.fn(() => ({
    connect: vi.fn(),
    gain: {
      value: 1
    }
  }));

  decodeAudioData = vi.fn((_data, success) => success?.({}));

  createBuffer = vi.fn();

  createBufferSource = vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn()
  }));

  destination = {
    connect: vi.fn()
  };

  suspend = vi.fn();
  resume = vi.fn();
  close = vi.fn();
  currentTime = 0;
}

beforeAll(() => {
  // @ts-ignore
  global.AudioContext = MockAudioContext;
  // @ts-ignore
  global.webkitAudioContext = MockAudioContext;
});
