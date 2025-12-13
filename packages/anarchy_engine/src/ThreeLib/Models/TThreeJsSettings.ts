export type TThreeJsSettings = Readonly<{
  draco: TDracoLoaderSettings;
}>;

export type TDracoLoaderSettings = Readonly<{
  // "dracoLoaderDecoderPath" is a custom path to the Draco loader's .setDecoderPath(). Could be needed in desktop apps, cause Electron doesn't support get files by fetch in asar archive.
  // (this is what ThreeJs does by default)
  // So need to use a custom path to the decoder files.
  dracoLoaderDecoderPath?: string;
  dracoLoaderDecoderType?: 'wasm' | 'js';
}>;
