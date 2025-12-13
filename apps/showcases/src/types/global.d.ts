// Keep this line, otherwise the file will not be recognized as a script, not as a declaration file
export {};

declare global {
  interface Window {
    platformAPI: {
      // TODO DESKTOP: Declare all platform API methods here
      ping(num: number): Promise<number>;
    };
  }
}
