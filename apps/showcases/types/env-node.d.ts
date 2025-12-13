declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    BUILD_TARGET: 'web' | 'desktop' | 'mobile';
  }
}
