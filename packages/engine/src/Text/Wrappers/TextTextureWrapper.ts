import type { TAbstractWrapper } from '@Engine/Abstract';
import { AbstractWrapper } from '@Engine/Abstract';
import { withObject3d } from '@Engine/Mixins';
import { textToConfig } from '@Engine/Text/Adapters';
import type { TextType } from '@Engine/Text/Constants';
import type { TTextConfig, TTextCssProps, TTextParams, TTextServiceDependencies, TTextTextureWrapper, TTextTransformDrive } from '@Engine/Text/Models';
import { TextTransformDrive } from '@Engine/Text/TransformDrive';
import { getWrapperTypeByTextType } from '@Engine/Text/Wrappers/TextWrapperHelper';
import type { TDriveToTargetConnector } from '@Engine/TransformDrive';
import { DriveToTargetConnector } from '@Engine/TransformDrive';
import { applyObject3dParams } from '@Engine/Utils';
import { stripUnits, toPx, toRem } from '@Shared/Utils';
import type { Subscription } from 'rxjs';
import { LinearFilter, Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from 'three';

export function createTextTextureWrapper(params: TTextParams, type: TextType, dependencies: TTextServiceDependencies): TTextTextureWrapper<Mesh> {
  let canvas: HTMLCanvasElement = document.createElement('canvas');
  let context: CanvasRenderingContext2D = canvas.getContext('2d')!;
  let text: string = params.text;

  const texture = new Texture(canvas);
  // eslint-disable-next-line functional/immutable-data
  texture.minFilter = LinearFilter;

  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true
  });

  const geometry = new PlaneGeometry();
  const entity = new Mesh(geometry, material);

  // TODO #191823 Text3dTextures doesn't update text values on textures on change
  async function setText(newText: string): Promise<void> {
    text = newText;
    const fontSize: string = toPx(params.cssProps?.fontSize);

    const fontSizeNoUnits: number = stripUnits(fontSize);
    const fontFamily: string | undefined = params.cssProps?.fontFamily;

    await document.fonts.ready;
    await document.fonts.load(`${fontSize} ${fontFamily ?? 'Arial'}`, text);

    // eslint-disable-next-line functional/immutable-data
    context.font = `${fontSize} ${fontFamily ?? 'Arial'}`;

    const textMetrics: TextMetrics = context.measureText(text);
    const padding: number = fontSizeNoUnits * 0.2;
    // const ascent: number = textMetrics.actualBoundingBoxAscent ?? fontSizeNoUnits;
    // const descent: number = textMetrics.actualBoundingBoxDescent ?? fontSizeNoUnits * 0.2;
    const textWidth: number = Math.ceil(textMetrics.width + padding * 2);
    //const textWidth: number = Math.ceil(textMetrics.width + padding * 2);
    const textHeight: number = Math.ceil(fontSizeNoUnits + padding * 2);
    //const textHeight: number = Math.ceil(ascent + descent + padding * 2);

    // eslint-disable-next-line functional/immutable-data
    canvas.width = textWidth;
    // eslint-disable-next-line functional/immutable-data
    canvas.height = textHeight;

    // eslint-disable-next-line functional/immutable-data
    context.font = `${fontSize} ${fontFamily ?? 'Arial'}`;

    // eslint-disable-next-line functional/immutable-data
    context.textAlign = 'center';
    // eslint-disable-next-line functional/immutable-data
    context.textBaseline = 'middle';
    // eslint-disable-next-line functional/immutable-data
    context.fillStyle = params.cssProps?.backgroundColor ?? 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // eslint-disable-next-line functional/immutable-data
    context.fillStyle = params.cssProps?.color ?? '#000000';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    // eslint-disable-next-line functional/immutable-data
    texture.needsUpdate = true;

    const newGeometryWidth: number = canvas.width / 256;
    const newGeometryHeight: number = canvas.height / 256;

    entity.geometry.dispose();
    // eslint-disable-next-line functional/immutable-data
    entity.geometry = new PlaneGeometry(newGeometryWidth, newGeometryHeight);
  }

  function getPropsAsCss(): Pick<TTextCssProps, 'fontSize' | 'fontFamily' | 'backgroundColor' | 'color'> {
    const font: string = context.font;
    const match = font.match(/(\d+(?:\.\d+)?)(px|pt|em|rem|%)\s+(.+)/) ?? [];
    let fontSize: string = match?.[1] + match?.[2];
    fontSize = toRem(fontSize);
    const fontFamily: string = match?.[3];

    let color: string | undefined = context.fillStyle.toString();
    if (color === '#000000') color = undefined;

    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
    let backgroundColor: string | undefined = `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
    if (r === 0 && g === 0 && b === 0 && a === 0) backgroundColor = undefined;

    return {
      fontSize,
      fontFamily,
      color,
      backgroundColor
    };
  }

  const wrapper: TAbstractWrapper<Mesh> = AbstractWrapper(entity, getWrapperTypeByTextType(type), params);
  const drive: TTextTransformDrive = TextTransformDrive(params, dependencies, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  // eslint-disable-next-line functional/immutable-data
  const result: TTextTextureWrapper<Mesh> = Object.assign(wrapper, {
    type,
    drive,
    driveToTargetConnector,
    ...withObject3d(entity),
    getElement: () => canvas,
    setText,
    getText: (): string => text,
    getPropsAsCss,
    serialize: (): TTextConfig => textToConfig(result)
  });

  setText(params.text);
  applyObject3dParams(result, params);

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    texture.dispose();
    context?.clearRect(0, 0, canvas.width, canvas.height);
    if (canvas?.parentNode) canvas.parentNode?.removeChild(canvas);
    canvas = null as any;
    context = null as any;
  });

  return result;
}
