import { Text } from 'troika-three-text';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ITextAccessors, ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { getAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { isDefined } from '@/Engine/Utils';

// TODO (S.Panfilov) CWP add text config to json config
export function TextWrapper(params: ITextParams): ITextWrapper {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const entity: Text = new Text();

  const accessors: ITextAccessors = getAccessors(entity);

  accessors.setText(params.text);
  if (isDefined(params.fontSize)) accessors.setFontSize(params.fontSize);
  const { x, y, z } = params.position.getCoords();
  accessors.setPosition(x, y, z);
  if (isDefined(params.color)) accessors.setColor(params.color);

  accessors.update();

  return {
    ...AbstractWrapper(entity, WrapperType.Text, params),
    ...accessors
  };
}
