declare namespace NodeJS {
  interface ProcessEnv {
    CI: boolean;
    NODE_ENV?: 'development' | 'test' | 'production';
    PORT: string;
  }
}
