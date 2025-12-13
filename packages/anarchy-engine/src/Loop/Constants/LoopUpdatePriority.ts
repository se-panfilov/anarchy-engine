export enum LoopUpdatePriority {
  ASAP = 0, // (every tick)
  HIGH = 1, // (every 2nd tick)
  MEDIUM = 2, // (every 4th tick)
  LOW = 3, // (every 8th tick)
  VERY_IDLE = 4, // (every 16th tick)
  IDLE = 5 // (every 32nd tick)
}
