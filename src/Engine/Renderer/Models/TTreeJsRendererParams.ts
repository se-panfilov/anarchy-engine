import type { OffscreenCanvas } from 'three';

export type TTreeJsRendererParams = Readonly<{
  canvas?: HTMLCanvasElement | OffscreenCanvas | undefined;
  context?: WebGLRenderingContext | undefined;
  precision?: string | undefined;
  alpha?: boolean | undefined;
  premultipliedAlpha?: boolean | undefined;
  antialias?: boolean | undefined;
  stencil?: boolean | undefined;
  preserveDrawingBuffer?: boolean | undefined;
  powerPreference?: string | undefined;
  depth?: boolean | undefined;
  logarithmicDepthBuffer?: boolean | undefined;
  failIfMajorPerformanceCaveat?: boolean | undefined;
}>;
