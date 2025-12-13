import type { Machine, Service } from 'robot3';

export type TAnimationsFsmState = string;

export type TAnimationsFsmInstance = Service<Machine<Record<string, any>, any, any, TAnimationsFsmState>>;
