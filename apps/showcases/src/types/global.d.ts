// Keep this line. Otherwise, the file will not be recognized as a script, not as a declaration file
export {};

declare global {
  interface Window {
    //Same name as "platformApiName" in showcase-desktop/src/Constants/AppToPlatformMessagesConstants.ts
    platformApi: {
      // TODO DESKTOP: Declare all platform API methods here
      // TODO DESKTOP: any (should be TAppSettings)
      saveAppSettings: (settings: any) => Promise<void>;
      // TODO DESKTOP: any (should be TAppSettings)
      loadAppSettings: () => Promise<any>;
      node: () => string;
      chrome: () => string;
      electron: () => string;
      desktopAppVersion: () => Promise<string>;
    };
  }
}
