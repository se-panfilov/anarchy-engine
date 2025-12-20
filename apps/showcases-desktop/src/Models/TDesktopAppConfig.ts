export type TDesktopAppConfig = Readonly<{
  isOpenDevTools: boolean;
  showInstantly?: boolean;
  isBorderless?: boolean;
  isResizable?: boolean;
  isFullScreenable?: boolean;
  isFullScreen?: boolean;
  isForceDpr?: boolean;
  highDpiSupport?: number;
}>;
