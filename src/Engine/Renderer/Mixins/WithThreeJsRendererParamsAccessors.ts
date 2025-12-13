import type { WebGLRenderer } from 'three';

import type { TThreeJsRendererParamsAccessors } from '@/Engine/Renderer/Models';

export function withThreeJsRendererParamsAccessors(entity: WebGLRenderer): TThreeJsRendererParamsAccessors {
  // const setCanvas = (canvas: HTMLCanvasElement): void => void (entity.domElement = canvas);
  // const getCanvas = (): HTMLCanvasElement => entity.domElement;

  // const setContext = (context: WebGLRenderingContext): void => void (entity.context = context);
  const getContext = (): WebGLRenderingContext => entity.getContext();

  // const setPrecision = (precision: string): void => void (entity.precision = precision);
  // const getPrecision = (): string => entity.precision;

  // const setAlpha = (isAlpha: boolean): void => void (entity.alpha = isAlpha);
  // const isAlpha = (): boolean => entity.alpha;

  // const setPremultipliedAlpha = (isPremultipliedAlpha: boolean): void => void (entity.premultipliedAlpha = isPremultipliedAlpha);
  // const isPremultipliedAlpha = (): boolean => entity.premultipliedAlpha;

  // const setAntialias = (isAntialias: boolean): void => void (entity.antialias = isAntialias);
  // const isAntialias = (): boolean => entity.antialias;

  // const setStencil = (isStencil: boolean): void => entity.stencil = isStencil;
  // const isStencil = (): boolean => entity.stencil;

  // const setPreserveDrawingBuffer = (isPreserveDrawingBuffer: boolean): void => void (entity.preserveDrawingBuffer = isPreserveDrawingBuffer);
  // const isPreserveDrawingBuffer = (): boolean => entity.preserveDrawingBuffer;

  // const setPowerPreference = (powerPreference: string): void => entity.powerPreference = powerPreference;
  // const getPowerPreference = (): string => entity.powerPreference;

  // const setDepth = (isDepth: boolean): void => entity.depth = isDepth;
  // const isDepth = (): boolean => entity.depth;

  // const setLogarithmicDepthBuffer = (isLogarithmicDepthBuffer: boolean): void => void (entity.logarithmicDepthBuffer = isLogarithmicDepthBuffer);
  // const isLogarithmicDepthBuffer = (): boolean => entity.logarithmicDepthBuffer;

  // const setFailIfMajorPerformanceCaveat = (isFailIfMajorPerformanceCaveat: boolean): void => void (entity.failIfMajorPerformanceCaveat = isFailIfMajorPerformanceCaveat);
  // const isFailIfMajorPerformanceCaveat = (): boolean => entity.failIfMajorPerformanceCaveat;

  return {
    // setCanvas,
    // getCanvas,
    // setContext,
    getContext
    // setPrecision,
    // getPrecision,
    // setAlpha,
    // isAlpha,
    // setPremultipliedAlpha,
    // isPremultipliedAlpha,
    // setAntialias,
    // isAntialias,
    // setStencil,
    // isStencil,
    // setPreserveDrawingBuffer,
    // isPreserveDrawingBuffer,
    // setPowerPreference,
    // getPowerPreference,
    // setDepth,
    // isDepth,
    // setLogarithmicDepthBuffer,
    // isLogarithmicDepthBuffer,
    // setFailIfMajorPerformanceCaveat,
    // isFailIfMajorPerformanceCaveat
  };
}
