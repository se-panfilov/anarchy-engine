import { object, pipe, string, transform } from 'valibot';

const toBool = pipe(
  string(),
  transform((v: string): boolean => v === 'true')
);
const toInt = pipe(
  string(),
  transform((v: string): number => parseInt(v, 10))
);

export const runtimeSchema = object({
  VITE_SHOW_DEBUG_INFO: toBool,
  VITE_AUDIO_LOOP_STEP: toInt,
  VITE_AUDIO_LOOP_IS_PARALLEL: toBool,
  VITE_PHYSICAL_LOOP_STEP: toInt,
  VITE_PHYSICAL_LOOP_IS_PARALLEL: toBool,
  VITE_COLLISIONS_LOOP_STEP: toInt,
  VITE_COLLISIONS_LOOP_IS_PARALLEL: toBool,
  VITE_KINEMATIC_LOOP_STEP: toInt,
  VITE_KINEMATIC_LOOP_IS_PARALLEL: toBool,
  VITE_SPATIAL_LOOP_STEP: toInt,
  VITE_SPATIAL_LOOP_IS_PARALLEL: toBool,
  VITE_TRANSFORM_LOOP_STEP: toInt,
  VITE_TRANSFORM_LOOP_IS_PARALLEL: toBool,
  VITE_TEXT_LOOP_STEP: toInt,
  VITE_TEXT_LOOP_IS_PARALLEL: toBool,
  VITE_KEYBOARD_LOOP_STEP: toInt,
  VITE_KEYBOARD_LOOP_IS_PARALLEL: toBool,
  VITE_MOUSE_LOOP_STEP: toInt,
  VITE_MOUSE_LOOP_IS_PARALLEL: toBool,
  VITE_INTERSECTIONS_LOOP_STEP: toInt,
  VITE_INTERSECTIONS_LOOP_IS_PARALLEL: toBool,
  VITE_CONTROLS_LOOP_STEP: toInt,
  VITE_CONTROLS_LOOP_IS_PARALLEL: toBool
});

export const nodeSchema = object({
  CI: toBool,
  PORT: toInt
});
