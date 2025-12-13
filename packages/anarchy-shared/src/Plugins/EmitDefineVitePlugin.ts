import type { Plugin } from 'vite';

type TOpts = Readonly<{
  value: Record<string, string>;
  fileName: string;
}>;

export function emitDefineJson({ fileName, value }: TOpts): Plugin {
  return {
    name: 'emit-define-json',
    apply: 'build',
    generateBundle(): void {
      const out: Record<string, unknown> = value;

      this.emitFile({
        type: 'asset',
        fileName,
        source: JSON.stringify(out, null, 2)
      });
    }
  };
}
