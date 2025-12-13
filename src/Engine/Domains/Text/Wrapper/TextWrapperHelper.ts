import type { ITextAccessors, ITextProps } from '@/Engine/Domains/Text/Models';
import { isDefined } from '@/Engine/Utils';

export function applyTextParams(
  {
    text,
    fontSize,
    color,
    font,
    maxWidth,
    lineHeight,
    letterSpacing,
    textAlign,
    material,
    anchorX,
    anchorY,
    clipRect,
    depthOffset,
    direction,
    overflowWrap,
    whiteSpace,
    outlineWidth,
    outlineOffsetX,
    outlineOffsetY,
    outlineColor,
    outlineOpacity,
    strokeWidth,
    strokeColor,
    strokeOpacity,
    curveRadius,
    fillOpacity,
    fontStyle,
    fontWeight,
    glyphGeometryDetail,
    gpuAccelerateSDF,
    outlineBlur,
    sdfGlyphSize,
    textIndent,
    unicodeFontsUrl
  }: ITextProps,
  entityWithAccessors: ITextAccessors
): void {
  entityWithAccessors.setText(text);
  if (isDefined(fontSize)) entityWithAccessors.setFontSize(fontSize);
  if (isDefined(color)) entityWithAccessors.setColor(color);
  if (isDefined(font)) entityWithAccessors.setFont(font);
  if (isDefined(maxWidth)) entityWithAccessors.setMaxWidth(maxWidth);
  if (isDefined(lineHeight)) entityWithAccessors.setLineHeight(lineHeight);
  if (isDefined(letterSpacing)) entityWithAccessors.setLetterSpacing(letterSpacing);
  if (isDefined(textAlign)) entityWithAccessors.setTextAlign(textAlign);
  if (isDefined(material)) entityWithAccessors.setMaterial(material);
  if (isDefined(anchorX)) entityWithAccessors.setAnchorX(anchorX);
  if (isDefined(anchorY)) entityWithAccessors.setAnchorY(anchorY);
  if (isDefined(clipRect)) entityWithAccessors.setClipRect(clipRect);
  if (isDefined(depthOffset)) entityWithAccessors.setDepthOffset(depthOffset);
  if (isDefined(direction)) entityWithAccessors.setDirection(direction);
  if (isDefined(overflowWrap)) entityWithAccessors.setOverflowWrap(overflowWrap);
  if (isDefined(whiteSpace)) entityWithAccessors.setWhiteSpace(whiteSpace);
  if (isDefined(outlineWidth)) entityWithAccessors.setOutlineWidth(outlineWidth);
  if (isDefined(outlineOffsetX)) entityWithAccessors.setOutlineOffsetX(outlineOffsetX);
  if (isDefined(outlineOffsetY)) entityWithAccessors.setOutlineOffsetY(outlineOffsetY);
  if (isDefined(outlineColor)) entityWithAccessors.setOutlineColor(outlineColor);
  if (isDefined(outlineOpacity)) entityWithAccessors.setOutlineOpacity(outlineOpacity);
  if (isDefined(strokeWidth)) entityWithAccessors.setStrokeWidth(strokeWidth);
  if (isDefined(strokeColor)) entityWithAccessors.setStrokeColor(strokeColor);
  if (isDefined(strokeOpacity)) entityWithAccessors.setStrokeOpacity(strokeOpacity);
  if (isDefined(curveRadius)) entityWithAccessors.setCurveRadius(curveRadius);
  if (isDefined(fillOpacity)) entityWithAccessors.setFillOpacity(fillOpacity);
  if (isDefined(fontStyle)) entityWithAccessors.setFontStyle(fontStyle);
  if (isDefined(fontWeight)) entityWithAccessors.setFontWeight(fontWeight);
  if (isDefined(glyphGeometryDetail)) entityWithAccessors.setGlyphGeometryDetail(glyphGeometryDetail);
  if (isDefined(gpuAccelerateSDF)) entityWithAccessors.setGpuAccelerateSDF(gpuAccelerateSDF);
  if (isDefined(outlineBlur)) entityWithAccessors.setOutlineBlur(outlineBlur);
  if (isDefined(sdfGlyphSize)) entityWithAccessors.setSdfGlyphSize(sdfGlyphSize);
  if (isDefined(textIndent)) entityWithAccessors.setTextIndent(textIndent);
  if (isDefined(unicodeFontsUrl)) entityWithAccessors.setUnicodeFontsUrl(unicodeFontsUrl);
}
