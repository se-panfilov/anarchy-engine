import type { TSpaceCanvas, TWriteable } from '@/Engine';

export function getMockCanvas(): TSpaceCanvas {
  const canvas: TWriteable<TSpaceCanvas> = document.createElement('canvas');
  // eslint-disable-next-line functional/immutable-data
  HTMLCanvasElement.prototype.getContext = vi.fn(() => {
    return {
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      getImageData: vi.fn(() => ({ data: [] })),
      putImageData: vi.fn(),
      createImageData: vi.fn(),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      fillText: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      strokeRect: vi.fn(),
      clip: vi.fn()
    } as any;
  });

  return canvas;
}
