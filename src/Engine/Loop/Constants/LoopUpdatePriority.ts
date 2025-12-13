export enum LoopUpdatePriority {
  ASAP = 5, //e.g. fast bullets // (every tick)
  HIGH = 4, // e.g. slow bullets (rockets, etc), or vehicles // (every 2nd tick)
  MEDIUM = 3, // e.g. player & NPCs // (every 4th tick)
  LOW = 2, // e.g. slow background objects // (every 8th tick)
  IDLE = 1, // e.g. things that should not have collisions, but just to be on a safe side we check them lazily // (every 16th tick)
  NEVER = 0 // e.g. background objects without collisions // (every 32th tick)
}
