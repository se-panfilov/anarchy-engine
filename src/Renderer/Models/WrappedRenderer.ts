import { Entity } from '../../Models';
import { WebGL1Renderer } from 'three';

export interface WrappedRenderer extends Entity {
  readonly renderer: WebGL1Renderer;
}
