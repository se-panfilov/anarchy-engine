import { ambientContext } from '@/Engine/Context';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TSpaceCanvas } from '@/Engine/Space';
import { isDefined } from '@/Engine/Utils';

export function findDomElement(canvasSelector: string): HTMLElement | null {
  const appContainer: TAppGlobalContainer = ambientContext.container.getAppContainer();
  return appContainer.document.querySelector(canvasSelector);
}

export function findOrCreateCanvas(canvasSelector: string): TSpaceCanvas | never {
  const result: TSpaceCanvas | HTMLElement = findDomElement(canvasSelector) ?? createDomElement(canvasSelector, 'canvas');
  if (!isCanvasElement(result)) throw new Error(`DomUtils: Canvas ("${canvasSelector}") found, but it isn't an instance of HTMLCanvasElement`);
  return result;
}

export function createDomElement(selector: string, tagName: string): HTMLElement {
  const appContainer: TAppGlobalContainer = ambientContext.container.getAppContainer();
  const element: HTMLElement = appContainer.document.createElement(tagName);
  element.setAttribute('id', selector.replace('#', ''));
  appContainer.document.body.appendChild(element);

  return element;
}

export function isCanvasElement(element: HTMLElement | unknown): element is HTMLCanvasElement {
  return element instanceof HTMLCanvasElement;
}

type TTagInfo = Readonly<{
  tag: string;
  id?: string;
  classList: ReadonlyArray<string>;
}>;

function parseSelector(selector: string): ReadonlyArray<TTagInfo> {
  const parts: ReadonlyArray<string> = selector.trim().split(/\s*>\s*/);

  return parts.map((part: string): TTagInfo => {
    const tagMatch: RegExpMatchArray | null = part.match(/^([a-zA-Z0-9-]+)?/);
    const idMatch: RegExpMatchArray | null = part.match(/#([a-zA-Z0-9\-_]+)/);
    const classMatches: ReadonlyArray<RegExpExecArray> = [...part.matchAll(/\.([a-zA-Z0-9\-_]+)/g)];

    const tag: string = tagMatch?.[1] || 'div';
    const id: string | undefined = idMatch?.[1];
    const classList: ReadonlyArray<string> = classMatches.map((match) => match[1]);

    return { tag, id, classList };
  });
}

export function getOrCreateCanvasFromSelector(selector: string): HTMLCanvasElement {
  const existing: Element | null = document.querySelector(selector);
  if (isDefined(existing) && isCanvasElement(existing)) return existing;

  const tree: ReadonlyArray<TTagInfo> = parseSelector(selector);
  let parent: HTMLElement = ambientContext.container.getAppContainer().document.body;
  let current: HTMLElement | undefined = undefined;

  // eslint-disable-next-line functional/no-loop-statements
  for (let i: number = 0; i < tree.length; i++) {
    const { tag, id, classList } = tree[i];
    const isLast: boolean = i === tree.length - 1;
    const elementTag: string = isLast ? 'canvas' : tag || 'div';

    const found: Element | undefined = Array.from(parent.children).find((child: Element): boolean => {
      if (child.tagName.toLowerCase() !== elementTag.toLowerCase()) return false;
      if (id && child.id !== id) return false;
      // eslint-disable-next-line functional/no-loop-statements
      for (const c of classList) {
        if (!child.classList.contains(c)) return false;
      }
      return true;
    });

    if (found) {
      current = found as HTMLElement;
    } else {
      const el: HTMLElement = document.createElement(elementTag);
      // eslint-disable-next-line functional/immutable-data
      if (id) el.id = id;
      if (classList.length > 0) el.classList.add(...classList);
      parent.appendChild(el);
      current = el;
    }

    parent = current;
  }

  if (!isCanvasElement(current)) throw new Error(`getOrCreateCanvasFromSelector: Final element is not a canvas.`);

  return current;
}
