export function isWebGLAvailable(): boolean {
  let canvas: Readonly<HTMLCanvasElement> | undefined = undefined;

  try {
    if (!window || !document) return false;
    canvas = document.createElement('canvas');
    if (!canvas) return false;
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  } finally {
    canvas = undefined;
  }
}

export function isWebGL2Available(): boolean {
  let canvas: Readonly<HTMLCanvasElement> | undefined = undefined;

  try {
    if (!window || !document) return false;
    canvas = document.createElement('canvas');
    if (!canvas) return false;
    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
  } finally {
    canvas = undefined;
  }
}
