import type { Color } from 'three';
import type { Text } from 'troika-three-text';

import type { ITextAccessors } from '@/Engine/Domains/Text/Models';
import { moveableMixin, rotatableMixin } from '@/Engine/Mixins';
import type { IWriteable } from '@/Engine/Utils';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<Text>): ITextAccessors {
  function setText(text: string): void {
    // eslint-disable-next-line functional/immutable-data
    entity.text = text;
  }

  function setFontSize(fontSize: number): void {
    // eslint-disable-next-line functional/immutable-data
    entity.fontSize = fontSize;
  }

  function setColor(color: string | number | Color): void {
    // eslint-disable-next-line functional/immutable-data
    entity.color = color;
  }

  function update(): void {
    entity.sync();
  }

  function dispose(): void {
    entity.dispose();
  }

  return { ...moveableMixin(entity), ...rotatableMixin(entity), setText, setFontSize, setColor, dispose, update };
}
