// Keep this line. Otherwise, the file will not be recognized as a script, not as a declaration file
export {};

declare global {
  //Constants from vite's define
  const __DESKTOP_APP_VERSION__: string;
  const __PLATFORM_MODE__: 'dev' | 'production';
}
