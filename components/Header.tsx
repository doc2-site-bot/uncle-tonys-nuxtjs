import { select, selectAll } from "hast-util-select";
import { toText } from "hast-util-to-text";
import { Root } from "hast";
import { NuxtLink } from "#components";

function Header({ hast }: { hast: Root | undefined }) {
  if (!hast) {
    return null;
  }

  const logo = select("img", hast);
  const links = selectAll("a", hast);

  return (
    <header class="flex items-center justify-center gap-4 py-2 flex-wrap">
      {logo?.properties && (
        <img
          class="md:ml-[-115px]"
          src={String(logo.properties.src || "").replace(".default.", ".300.")}
          height={115}
          width={115}
          loading="eager"
          alt={String(logo.properties.alt || "")}
        />
      )}

      <nav class="flex items-center">
        {links.map((link) => {
          const href = String(link?.properties?.href || "");

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
