import { toH } from 'hast-to-hyperscript';
import { h as createElement } from 'vue';
import { Root } from 'hast';
import { h } from 'hastscript';

const variables = {
  year: {
    value: new Date().getFullYear(),
    href: ''
  },
  framework: {
    value: 'Nuxt.js',
    href: 'https://nuxt.com/'
  },
  host: {
    value: 'Cloudflare',
    href: 'http://cloudflare.com/'
  },
  repo: {
    value: 'GitHub repository',
    href: 'https://github.com/doc2-site-bot/uncle-tonys-nuxtjs'
  }
};

export default function Footer({ hast }: { hast: Root | undefined }) {
  if (!hast) {
    return null;
  }

  return (
    <footer class="prose max-w-none text-center mx-auto px-8">
      {toH((name, props, children) => {
        if (name === 'variable') {
          const key = children?.[0];
          const variable = variables[key as keyof typeof variables];

          if (!variable) {
            console.warn(`Variable ${key} not found`);
          }

          if (variable.href) {
            return (
              <a href={variable.href} target="_blank" rel="noreferrer">
                {variable.value}
              </a>
            );
          }

          return <span>{variable.value}</span>;
        } else if (name === 'a') {
          return (
            <a href={props.href} target="_blank" rel="noreferrer">
              {children}
            </a>
          );
        }

        return createElement(name, props, children);
      }, h('div', ...hast.children))}
    </footer>
  );
}
