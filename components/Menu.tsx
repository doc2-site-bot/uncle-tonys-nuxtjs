import { toH } from 'hast-to-hyperscript';
import { h as createElement } from 'vue';
import { Element } from 'hast';
import { h } from 'hastscript';

function MenuItem({ name, price, description }: { name: string; price: string; description?: string }) {
  return (
    <div>
      <div class="italic flex">
        <span class="flex-1">{name}</span>
        <span>${price}</span>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

function Menu({ hast, refs }: { hast: Element; refs: Reference | undefined }) {
  if (!refs) {
    return null;
  }

  const { keys, rows } = refs[String(hast?.properties?.details || '')];

  if (!keys || !rows) {
    return null;
  }

  const isByType = keys.includes('type');
  const rowsByType: { [key: string]: Array<{ [key: string]: string }> } = {};
  if (isByType) {
    rows.forEach((row) => {
      if (!rowsByType[row.type]) {
        rowsByType[row.type] = [];
      }

      rowsByType[row.type].push(row);
    });
  }

  return (
    <div class="prose lg:prose-xl bg-red-900 mx-auto px-8 m-16 rounded-md drop-shadow-lg">
      <div class="py-1">{toH(createElement, h('div', ...hast.children))}</div>
      <div class="flex flex-col gap-4">
        {isByType
          ? Object.keys(rowsByType).map((type) => {
              return (
                <div class="py-2">
                  {rowsByType[type].length > 1 ? (
                    <div class="divide-y-2">
                      <strong class="italic block">{type}</strong>
                      {rowsByType[type].map((row) => (
                        <MenuItem name={row.name} price={row.price} description={row.description} />
                      ))}
                    </div>
                  ) : (
                    <MenuItem name={type} price={rowsByType[type][0].price} description={rowsByType[type][0].name} />
                  )}
                </div>
              );
            })
          : rows.map((row) => {
              const prices = Object.keys(row).filter((key) => key.startsWith('price'));

              if (prices.length > 1) {
                return (
                  <div class="py-4">
                    <strong>{row.name}</strong>
                    <p>{row.description}</p>
                    <div class="divide-y-2">
                      {prices.map((price) => (
                        <MenuItem name={price.replace('price', '')} price={row[price]} />
                      ))}
                    </div>
                  </div>
                );
              }

              return <MenuItem name={row.name} price={row.price} description={row.description} />;
            })}
      </div>
    </div>
  );

  return null;
}

export default Menu;
