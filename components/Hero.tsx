import { toH } from "hast-to-hyperscript";
import { h as createElement } from "vue";
import { Element } from "hast";
import { h } from "hastscript";

// Fix: Property 'loading' does not exist on type 'ElementAttrs<ImgHTMLAttributes>'
// Source: https://stackoverflow.com/questions/66461748/vue-3-typescript-jsx-and-img-loading-lazy-give-error-property-loading
declare module "@vue/runtime-dom" {
  interface ImgHTMLAttributes extends HTMLAttributes {
    loading?: "lazy" | "eager" | "auto";
  }
}

function Hero({ hast }: { hast: Element }) {
  return (
    <div class="prose lg:prose-xl text-center bg-red-900 mx-auto py-4 my-16 rounded-md drop-shadow-lg">
      <div class="max-w-screen-lg">
        {toH((name, properties, children) => {
          if (name === "img") {
            return (
              <img
                src={properties.src}
                loading="eager"
                alt={properties.alt}
                class="object-cover"
              />
            );
          }

          return createElement(name, properties, children);
        }, h("div", ...hast.children))}
      </div>
    </div>
  );
}

export default Hero;
