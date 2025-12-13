export type TAnimationsConfig = Readonly<{
  clipName: string;
  time: number;
  weight: number;
  loop: number;
  repetitions: number;
  clampWhenFinished: boolean;
  timeScale: number;
  enabled: boolean;
  paused: boolean;
}>;
