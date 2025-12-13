import type { Material } from 'three';
import { Text } from 'troika-three-text';

import type { ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { isDefined } from '@/Engine/Utils';
import type { IVector3Wrapper } from '@/Engine/Wrappers';

function TextWrapper(text: string, position: IVector3Wrapper, params: ITextParams): ITextWrapper {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const entity = new Text();
  setText(text);
  if (isDefined(params.fontSize)) setFontSize(params.fontSize);
  setPosition(position);
  if (isDefined(params.color)) setColor(params.color);

  update();

  function update(): void {
    entity.sync();
  }

  function setText(text: string): void {
    // eslint-disable-next-line functional/immutable-data
    entity.text = text;
  }

  function setFontSize(fontSize: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.fontSize = fontSize;
  }

  function setColor(color: string | number | Material): void {
    // eslint-disable-next-line functional/immutable-data
    entity.color = color;
  }

  function setPosition(vector: IVector3Wrapper): void {
    // eslint-disable-next-line functional/immutable-data
    entity.position = vector.getCoords();
  }

  function dispose(): void {
    entity.dispose();
  }

  return {
    update,
    setText,
    setFontSize,
    setColor,
    setPosition,
    dispose,
    entity
  };
}
