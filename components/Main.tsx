import { h as createElement, VNode } from 'vue';
import { toH } from 'hast-to-hyperscript';
import { Root, Element } from 'hast';
import Hero from './Hero';
import Contact from './Contact';
import Menu from './Menu';

type RenderParams = {
  meta?: { [key: string]: string };
  hast?: Root;
  refs?: Reference;
  components?: string[];
  key?: string;
};

const componentMap = {
  contact: Contact,
  hero: Hero,
  menu: Menu
};

/**
 * Recursively render hast with references and components
 */
function render({ hast, refs, components }: RenderParams): Array<VNode> | null {
  if (!hast) {
    return null;
  }

  const elements = hast.children.filter(
    (child) => child.type === 'element' && child.tagName !== 'header' && child.tagName !== 'footer'
  ) as unknown as Array<Element>;

  return elements.map((child) => {
    if (child.tagName === 'fragment' && refs && child?.properties?.reference) {
      return render({ ...refs[String(child.properties.reference)] });
    }

    if (components && components.includes(child.tagName)) {
      const component = componentMap[child.tagName as keyof typeof componentMap];

      if (!component) {
        console.warn(`Component "${child.tagName}" not found`);
        return null;
      }

      return createElement(component, { hast: child, refs });
    }

    return <div class="prose lg:prose-xl mx-auto py-4 text-center">{toH(createElement, child)}</div>;
  }) as unknown as Array<VNode> | null;
}

function Main({ hast, refs, components }: RenderParams) {
  return <main class="bg-red-800 py-8 px-8">{render({ hast, refs, components })}</main>;
}

export default Main;
