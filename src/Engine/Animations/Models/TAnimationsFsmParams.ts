import type { TWithNameOptional } from '@/Engine/Mixins';

// TODO 9.3.0 STATE: fix this type
// TODO 9.3.0 STATE: fix any
export type TAnimationsFsmParams = Record<string, any> & TWithNameOptional;

// export type TAnimationsFsmParams = Readonly<{
//   states: TAnimationState;
//   context?: {
//     final: boolean;
//     transitions: Map<string, Transition<string>[]>;
//     immediates?: Map<string, Immediate<string>[]> | undefined;
//     enter?: any;
//   };
// }> &
//   TWithNameOptional;

// TODO 9.3.0 STATE: fix any
// export type TAnimationState = MachineStates<any, any>;
// export type TAnimationState = Readonly<{
//   final: boolean;
//   transitions: Map<string, Transition<string>[]>;
//   immediates?: Map<string, Immediate<string>[]> | undefined;
//   enter?: any;
// }>;
