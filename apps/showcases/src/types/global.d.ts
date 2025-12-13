// Keep this line. Otherwise, the file will not be recognized as a script, not as a declaration file
export {};

declare global {
  interface Window {
    platformApi: {
      // TODO DESKTOP: Declare all platform API methods here
      // TODO DESKTOP: any
      saveAppSettings(settings: any): Promise<void>;
      // TODO DESKTOP: any
      loadAppSettings(): Promise<any>;
      node(): string;
      chrome(): string;
      electron(): string;
      desktopAppVersion(): Promise<string>;
    };
  }
}
