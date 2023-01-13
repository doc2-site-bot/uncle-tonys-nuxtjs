import { toH } from 'hast-to-hyperscript';
import { h as createElement } from 'vue';
import { h } from 'hastscript';
import { Element } from 'hast';

function Contact({ hast }: { hast: Element }) {
  const route = useRoute();
  const config = useRuntimeConfig();
  const mapsAddress = String(hast?.properties?.address || '');

  return (
    <div class="mx-auto py-16 prose lg:prose-xl text-center">
      {toH(createElement, h('div', ...hast.children))}

      {route.path !== '/' && mapsAddress && (
        <div class={`relative h-0 pb-[56.25%] overflow-hidden max-w-screen-md my-16 not-prose`}>
          <iframe
            title="Maps"
            class="absolute top-0 left-0 h-full w-full border-0"
            width="500"
            height="500"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${config.public.mapsKey}&q=${mapsAddress.replaceAll(
              ' ',
              '+'
            )}`}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

export default Contact;
