import { LinearFilter, Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from 'three';

import { AbstractWrapper } from '@/Engine/Abstract';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TextType } from '@/Engine/Text/Constants';
import type { TTextParams, TTextTextureWrapper } from '@/Engine/Text/Models';
import { getWrapperTypeByTextType } from '@/Engine/Text/Wrappers/TextWrapperHelper';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined, isNotDefined } from '@/Engine/Utils';

export function createTextTextureWrapper(params: TTextParams, type: TextType): TTextTextureWrapper<Mesh> {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

  const texture = new Texture(canvas);
  // eslint-disable-next-line functional/immutable-data
  texture.minFilter = LinearFilter;

  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true
  });

  const geometry = new PlaneGeometry();
  const entity = new Mesh(geometry, material);

  function setText(newText: string): void {
    const fontSize: string = toPx(params.cssProps?.fontSize);
    const fontSizeNoUnits: number = stripUnits(fontSize);
    // eslint-disable-next-line functional/immutable-data
    context.font = `${fontSize} Arial`;

    const textMetrics: TextMetrics = context.measureText(newText);
    const padding: number = fontSizeNoUnits * 0.2;
    const textWidth: number = Math.ceil(textMetrics.width + padding * 2 + 400);
    // const textWidth: number = Math.ceil(textMetrics.width * 0.2);
    const textHeight: number = Math.ceil(fontSizeNoUnits + padding * 2);

    // eslint-disable-next-line functional/immutable-data
    canvas.width = textWidth;
    // eslint-disable-next-line functional/immutable-data
    canvas.height = textHeight;

    // eslint-disable-next-line functional/immutable-data
    context.font = `${fontSize} Arial`;

    // eslint-disable-next-line functional/immutable-data
    context.textAlign = 'left';
    // eslint-disable-next-line functional/immutable-data
    context.textBaseline = 'middle';

    // eslint-disable-next-line functional/immutable-data
    context.fillStyle = params.cssProps?.color ?? '#000000';
    context.fillText(newText, canvas.width / 2, canvas.height / 2);
    // eslint-disable-next-line functional/immutable-data
    texture.needsUpdate = true;

    entity.geometry.dispose();
    // eslint-disable-next-line functional/immutable-data
    entity.geometry = new PlaneGeometry(canvas.width / 256, canvas.height / 256);
  }

  const result: TTextTextureWrapper<Mesh> = {
    type,
    ...AbstractWrapper(entity, getWrapperTypeByTextType(type), params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    getElement: () => canvas,
    setText
  };

  setText(params.text);
  applyObject3dParams(result, params);
  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);

  return result;
}

function toPx(value: string | number | undefined): string {
  // TODO better to use base text size from CSS or config file
  const baseTextSize: number = 16;
  if (isNotDefined(value)) return `${baseTextSize}px`;
  if (typeof value === 'number') return `${value}px`;
  if (/^\d+rem$/.test(value.toString())) return `${parseInt(value.toString()) * baseTextSize}px`;
  if (/^\d+em$/.test(value.toString())) return `${parseInt(value.toString()) * baseTextSize}px`;
  return `${baseTextSize}px`;
}

function stripUnits(value: string): number {
  return parseInt(value.replace(/[^\d]/g, ''));
}
