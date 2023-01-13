import { selectAll } from 'hast-util-select';
import { toText } from 'hast-util-to-text';
import { Root } from 'hast';
import { NuxtLink } from '#components';

function Header({ hast }: { hast: Root | undefined }) {
  if (!hast) {
    return null;
  }

  const links = selectAll('a', hast);

  return (
    <header class="flex h-32 items-center justify-center gap-4">
      <nav class="flex items-center">
        {links.map((link) => {
          const href = String(link?.properties?.href || '');

          return (
            <NuxtLink class="text-xl font-bold text-red-700 px-8" to={href}>
              {toText(link)}
            </NuxtLink>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
