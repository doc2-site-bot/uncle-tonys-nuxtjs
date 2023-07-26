<template>
  <Header :hast="header?.hast" />

  <Main :hast="hast" :refs="refs" :components="components" />

  <Footer :hast="footer?.hast" />
</template>

<script setup lang="ts">
import { select } from "hast-util-select";
import { Root } from "hast";

type PageProps = {
  meta?: { [key: string]: string };
  hast?: Root;
  refs?: ResolvedReference;
  components?: string[];
};

// Resolve path
const route = useRoute();
let path = "/";
const slug =
  route.params?.slug && Array.isArray(route.params.slug)
    ? route.params.slug
    : [];
if (slug.length) {
  path = `${path}${slug.join("/")}`;
}

// Ignore fragments
if (path.startsWith("/fragments/")) {
  throw createError({
    statusCode: 404,
    fatal: true,
    statusMessage: "Page Not Found",
  });
}

// Fetch page props
const { meta, hast, refs, components } = (await $fetch(
  `/api/page-props?path=${path}`
)) as PageProps;

// Query header and footer
let header: Document | null, footer: Document | null;
if (refs) {
  const [headerDocument, footerDocument] = ["web-header", "web-footer"].map(
    (name) => {
      const element = select(name, hast);

      if (element?.properties?.reference) {
        return refs[String(element.properties.reference)];
      }

      return null;
    }
  );

  header = headerDocument;
  footer = footerDocument;
}

// Update document title and meta
useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: meta?.title,
  meta: [{ name: "description", content: meta?.description }],
});
</script>
