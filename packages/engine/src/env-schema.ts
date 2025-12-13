import { toBool, toInt } from '@Shared/Utils';
import { object } from 'valibot';

// TODO 18-0-0 remove all these variables (except CI), adjust env-schema. Params should pe a part of Space options (Space.options.loops)
export const runtimeSchema = object({
  VITE_SHOW_DEBUG_INFO: toBool,
  VITE_AUDIO_LOOP_STEP: toInt,
  VITE_AUDIO_LOOP_IS_PARALLEL: toBool,
  VITE_PHYSICS_LOOP_STEP: toInt,
  VITE_PHYSICS_LOOP_IS_PARALLEL: toBool,
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

// export const nodeSchema = object({
// CI: toBool,
// });
