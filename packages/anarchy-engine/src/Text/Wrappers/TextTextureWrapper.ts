import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import { AbstractWrapper } from '@Anarchy/Engine/Abstract';
import { withObject3d } from '@Anarchy/Engine/Mixins';
import { textToConfig } from '@Anarchy/Engine/Text/Adapters';
import type { TextType } from '@Anarchy/Engine/Text/Constants';
import type { TTextConfig, TTextCssProps, TTextParams, TTextServiceDependencies, TTextTextureWrapper, TTextTransformDrive, TTextTranslationService } from '@Anarchy/Engine/Text/Models';
import { TextTransformDrive } from '@Anarchy/Engine/Text/TransformDrive';
import { getWrapperTypeByTextType } from '@Anarchy/Engine/Text/Wrappers/TextWrapperHelper';
import type { TDriveToTargetConnector } from '@Anarchy/Engine/TransformDrive';
import { DriveToTargetConnector } from '@Anarchy/Engine/TransformDrive';
import { applyObject3dParams } from '@Anarchy/Engine/Utils';
import { FallBackFonts } from '@Anarchy/Shared/Constants';
import { isDefined, isNotDefined, stripUnits, toPx, toRem } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { LinearFilter, Mesh, MeshBasicMaterial, PlaneGeometry, Texture } from 'three';

export function createTextTextureWrapper(params: TTextParams, type: TextType, dependencies: TTextServiceDependencies): TTextTextureWrapper<Mesh> {
  let canvas: HTMLCanvasElement = document.createElement('canvas');
  let context: CanvasRenderingContext2D = canvas.getContext('2d')!;
  let text: string = params.text ?? '';
  let textKey: string | undefined = params.textKey;
  let textTranslationService: TTextTranslationService | undefined;

  const texture: Texture = new Texture(canvas);
  // eslint-disable-next-line functional/immutable-data
  texture.minFilter = LinearFilter;

  const material: MeshBasicMaterial = new MeshBasicMaterial({
    map: texture,
    transparent: true
  });

  const geometry: PlaneGeometry = new PlaneGeometry();
  const entity: Mesh = new Mesh(geometry, material);

  let keyChangeSub$: Subscription | undefined;

  function subscribeKeyChange(textKey: string): Subscription {
    if (isNotDefined(textTranslationService)) throw new Error(`[TextWrapper]: Translation service is not defined. Wrapper Id: ${wrapper.id}, name: "${wrapper.name}".`);
    return textTranslationService.t$(textKey).pipe(distinctUntilChanged()).subscribe(setTextInternal);
  }

  function setTranslationService(translationService: TTextTranslationService): void {
    textTranslationService = translationService;
    if (isNotDefined(textKey) || textKey === '') return;
    keyChangeSub$ = subscribeKeyChange(textKey);
  }

  async function setTextInternal(newText: string): Promise<void> {
    text = newText;
    const fontSize: string = toPx(params.cssProps?.fontSize);

    const fontSizeNoUnits: number = stripUnits(fontSize);
    const fontFamily: string | undefined = params.cssProps?.fontFamily || textTranslationService?.locale$.value.font;

    await document.fonts.ready;
    await document.fonts.load(`${fontSize} ${fontFamily ?? FallBackFonts}`, text);

    // eslint-disable-next-line functional/immutable-data
    context.font = `${fontSize} ${fontFamily ?? FallBackFonts}`;

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

  async function setText(newText: string): Promise<void> {
    if (isDefined(keyChangeSub$)) keyChangeSub$?.unsubscribe();
    if (isDefined(textKey)) {
      textKey = undefined;
      console.warn(`[TextWrapper]: Text updated, translation disabled. Wrapper Id: ${wrapper.id}, name: "${wrapper.name}".`);
    }

    return setTextInternal(newText);
  }

  function setTextKey(newTextKey: string): void {
    if (isDefined(keyChangeSub$)) keyChangeSub$?.unsubscribe();
    textKey = newTextKey;
    keyChangeSub$ = subscribeKeyChange(textKey);
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
    setTranslationService,
    ...withObject3d(entity),
    getElement: () => canvas,
    setText,
    getText: (): string => text,
    setTextKey,
    getTextKey: (): string | undefined => textKey,
    getPropsAsCss,
    serialize: (): TTextConfig => textToConfig(result)
  });

  if (params.text && isNotDefined(params.textKey)) setText(params.text);
  applyObject3dParams(result, params);

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    keyChangeSub$?.unsubscribe();

    texture.dispose();
    context?.clearRect(0, 0, canvas.width, canvas.height);
    if (canvas?.parentNode) canvas.parentNode?.removeChild(canvas);
    canvas = null as any;
    context = null as any;
  });

  return result;
}
