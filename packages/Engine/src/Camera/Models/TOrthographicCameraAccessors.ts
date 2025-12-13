export type TOrthographicCameraAccessors = Readonly<{
  setAspect: (height: number, aspect: number) => void;
  setBottom: (bottom: number) => void;
  setLeft: (left: number) => void;
  setRight: (right: number) => void;
  setTop: (top: number) => void;
}>;
