import type { Color, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import type { Text } from 'troika-three-text';

import type { TextAlign, TextAnchorX, TextAnchorY, TextDirection, TextFontStyle, TextFontWeight, TextOverflowWrap, TextWhiteSpace } from '@/Engine/Domains/Text';
import type { ITextAccessors } from '@/Engine/Domains/Text/Models';
import { moveableMixin, rotatableMixin } from '@/Engine/Mixins';
import type { IWriteable } from '@/Engine/Utils';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<Text>): ITextAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setText = (text: string): void => void (entity.text = text);
  const getText = (): string => entity.text;
  // eslint-disable-next-line functional/immutable-data
  const setFontSize = (fontSize: number): void => void (entity.fontSize = fontSize);
  const getFontSize = (): number => entity.fontSize;
  // eslint-disable-next-line functional/immutable-data
  const setColor = (color: string | number | Color): void => void (entity.color = color);
  const getColor = (): string | number | Color => entity.color;
  // eslint-disable-next-line functional/immutable-data
  const setFont = (font: string): void => void (entity.font = font);
  const getFont = (): string => entity.font;
  // eslint-disable-next-line functional/immutable-data
  const setMaxWidth = (maxWidth: number): void => void (entity.maxWidth = maxWidth);
  const getMaxWidth = (): number => entity.maxWidth;
  // eslint-disable-next-line functional/immutable-data
  const setLineHeight = (lineHeight: number): void => void (entity.lineHeight = lineHeight);
  const getLineHeight = (): number => entity.lineHeight;
  // eslint-disable-next-line functional/immutable-data
  const setLetterSpacing = (letterSpacing: number): void => void (entity.letterSpacing = letterSpacing);
  const getLetterSpacing = (): number => entity.letterSpacing;
  // eslint-disable-next-line functional/immutable-data
  const setTextAlign = (textAlign: TextAlign): void => void (entity.textAlign = textAlign);
  const getTextAlign = (): TextAlign => entity.textAlign as TextAlign;
  // eslint-disable-next-line functional/immutable-data
  const setMaterial = (material: MeshBasicMaterial | MeshStandardMaterial): void => void (entity.material = material);
  const getMaterial = (): MeshBasicMaterial | MeshStandardMaterial => entity.material;
  // eslint-disable-next-line functional/immutable-data
  const setAnchorX = (anchorX: TextAnchorX | number): void => void (entity.anchorX = anchorX);
  const getAnchorX = (): TextAnchorX | number => entity.anchorX as TextAnchorX | number;
  // eslint-disable-next-line functional/immutable-data
  const setAnchorY = (anchorY: TextAnchorY | number): void => void (entity.anchorY = anchorY);
  const getAnchorY = (): TextAnchorY | number => entity.anchorY as TextAnchorY | number;
  // eslint-disable-next-line functional/immutable-data
  const setClipRect = (clipRect: [number, number, number, number]): void => void (entity.clipRect = clipRect);
  const getClipRect = (): [number, number, number, number] => entity.clipRect;
  // eslint-disable-next-line functional/immutable-data
  const setDepthOffset = (depthOffset: number): void => void (entity.depthOffset = depthOffset);
  const getDepthOffset = (): number => entity.depthOffset;
  // eslint-disable-next-line functional/immutable-data
  const setDirection = (direction: TextDirection): void => void (entity.direction = direction);
  const getDirection = (): TextDirection => entity.direction as TextDirection;
  // eslint-disable-next-line functional/immutable-data
  const setOverflowWrap = (overflowWrap: TextOverflowWrap): void => void (entity.overflowWrap = overflowWrap);
  const getOverflowWrap = (): TextOverflowWrap => entity.overflowWrap as TextOverflowWrap;
  // eslint-disable-next-line functional/immutable-data
  const setWhiteSpace = (whiteSpace: TextWhiteSpace): void => void (entity.whiteSpace = whiteSpace);
  const getWhiteSpace = (): TextWhiteSpace => entity.whiteSpace as TextWhiteSpace;
  // eslint-disable-next-line functional/immutable-data
  const setOutlineWidth = (outlineWidth: number): void => void (entity.outlineWidth = outlineWidth);
  const getOutlineWidth = (): number => entity.outlineWidth;
  // eslint-disable-next-line functional/immutable-data
  const setOutlineOffsetX = (outlineOffsetX: number): void => void (entity.outlineOffsetX = outlineOffsetX);
  const getOutlineOffsetX = (): number => entity.outlineOffsetX;
  // eslint-disable-next-line functional/immutable-data
  const setOutlineOffsetY = (outlineOffsetY: number): void => void (entity.outlineOffsetY = outlineOffsetY);
  const getOutlineOffsetY = (): number => entity.outlineOffsetY;
  // eslint-disable-next-line functional/immutable-data
  const setOutlineColor = (outlineColor: string | number): void => void (entity.outlineColor = outlineColor);
  const getOutlineColor = (): string | number => entity.outlineColor;
  // eslint-disable-next-line functional/immutable-data
  const setOutlineOpacity = (outlineOpacity: number): void => void (entity.outlineOpacity = outlineOpacity);
  const getOutlineOpacity = (): number => entity.outlineOpacity;
  // eslint-disable-next-line functional/immutable-data
  const setStrokeWidth = (strokeWidth: number): void => void (entity.strokeWidth = strokeWidth);
  const getStrokeWidth = (): number => entity.strokeWidth;
  // eslint-disable-next-line functional/immutable-data
  const setStrokeColor = (strokeColor: string | number | Color): void => void (entity.strokeColor = strokeColor);
  const getStrokeColor = (): string | number | Color => entity.strokeColor;
  // eslint-disable-next-line functional/immutable-data
  const setStrokeOpacity = (strokeOpacity: number): void => void (entity.strokeOpacity = strokeOpacity);
  const getStrokeOpacity = (): number => entity.strokeOpacity;
  // eslint-disable-next-line functional/immutable-data
  const setCurveRadius = (curveRadius: number): void => void (entity.curveRadius = curveRadius);
  const getCurveRadius = (): number => entity.curveRadius;
  // eslint-disable-next-line functional/immutable-data
  const setFillOpacity = (fillOpacity: number): void => void (entity.fillOpacity = fillOpacity);
  const getFillOpacity = (): number => entity.fillOpacity;
  // eslint-disable-next-line functional/immutable-data
  const setFontStyle = (fontStyle: TextFontStyle): void => void (entity.fontStyle = fontStyle);
  const getFontStyle = (): TextFontStyle => entity.fontStyle as TextFontStyle;
  // eslint-disable-next-line functional/immutable-data
  const setFontWeight = (fontWeight: TextFontWeight): void => void (entity.fontWeight = fontWeight);
  const getFontWeight = (): TextFontWeight => entity.fontWeight as TextFontWeight;
  // eslint-disable-next-line functional/immutable-data
  const setGlyphGeometryDetail = (glyphGeometryDetail: number): void => void (entity.glyphGeometryDetail = glyphGeometryDetail);
  const getGlyphGeometryDetail = (): number => entity.glyphGeometryDetail;
  // eslint-disable-next-line functional/immutable-data
  const setGpuAccelerateSDF = (gpuAccelerateSDF: boolean): void => void (entity.gpuAccelerateSDF = gpuAccelerateSDF);
  const getGpuAccelerateSDF = (): boolean => entity.gpuAccelerateSDF;
  // eslint-disable-next-line functional/immutable-data
  const setOutlineBlur = (outlineBlur: number): void => void (entity.outlineBlur = outlineBlur);
  const getOutlineBlur = (): number => entity.outlineBlur;
  // eslint-disable-next-line functional/immutable-data
  const setSdfGlyphSize = (sdfGlyphSize: number): void => void (entity.sdfGlyphSize = sdfGlyphSize);
  const getSdfGlyphSize = (): number => entity.sdfGlyphSize;
  // eslint-disable-next-line functional/immutable-data
  const setTextIndent = (textIndent: number): void => void (entity.textIndent = textIndent);
  const getTextIndent = (): number => entity.textIndent;
  // eslint-disable-next-line functional/immutable-data
  const setUnicodeFontsUrl = (unicodeFontsUrl: string): void => void (entity.unicodeFontsUrl = unicodeFontsUrl);
  const getUnicodeFontsUrl = (): string => entity.unicodeFontsUrl;

  const update = (): void => entity.sync();
  const dispose = (): void => entity.dispose();

  return {
    ...moveableMixin(entity),
    ...rotatableMixin(entity),
    setText,
    getText,
    setFontSize,
    getFontSize,
    setColor,
    getColor,
    setFont,
    getFont,
    setMaxWidth,
    getMaxWidth,
    setLineHeight,
    getLineHeight,
    setLetterSpacing,
    getLetterSpacing,
    setTextAlign,
    getTextAlign,
    setMaterial,
    getMaterial,
    setAnchorX,
    getAnchorX,
    setAnchorY,
    getAnchorY,
    setClipRect,
    getClipRect,
    setDepthOffset,
    getDepthOffset,
    setDirection,
    getDirection,
    setOverflowWrap,
    getOverflowWrap,
    setWhiteSpace,
    getWhiteSpace,
    setOutlineWidth,
    getOutlineWidth,
    setOutlineOffsetX,
    getOutlineOffsetX,
    setOutlineOffsetY,
    getOutlineOffsetY,
    setOutlineColor,
    getOutlineColor,
    setOutlineOpacity,
    getOutlineOpacity,
    setStrokeWidth,
    getStrokeWidth,
    setStrokeColor,
    getStrokeColor,
    setStrokeOpacity,
    getStrokeOpacity,
    setCurveRadius,
    getCurveRadius,
    setFillOpacity,
    getFillOpacity,
    setFontStyle,
    getFontStyle,
    setFontWeight,
    getFontWeight,
    setGlyphGeometryDetail,
    getGlyphGeometryDetail,
    setGpuAccelerateSDF,
    getGpuAccelerateSDF,
    setOutlineBlur,
    getOutlineBlur,
    setSdfGlyphSize,
    getSdfGlyphSize,
    setTextIndent,
    getTextIndent,
    setUnicodeFontsUrl,
    getUnicodeFontsUrl,
    update,
    dispose
  };
}
