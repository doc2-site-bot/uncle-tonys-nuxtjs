<template>
  <Header :hast="header?.hast" />

  <Main :hast="hast" :refs="refs" :components="components" />

  <Footer :hast="footer?.hast" />
</template>

<script setup lang="ts">
import { select } from 'hast-util-select';
import { resolveReferences } from '../utils';

const workspace = process.env.NODE_ENV === 'production' ? 'live' : 'preview';

const route = useRoute();
let path = '/';
const slug = route.params?.slug ? route.params.slug : [];
if (slug.length) {
  path = `${path}${slug.join('/')}`;
}

const config = useRuntimeConfig();

const reqDoc = await fetch(`https://api.doc2.site/v1/docs/${workspace}/${config.public.project}?path=${path}`);

const doc: Document = await reqDoc.json();

const { meta, hast, components, references } = doc;

const refs = references ? await resolveReferences(references) : undefined;

let header, footer;
if (refs) {
  const [headerDocument, footerDocument] = ['header', 'footer'].map((name) => {
    const element = select(name, hast);

    if (element?.properties?.reference) {
      return refs[String(element.properties.reference)];
    }

    return null;
  });

  header = headerDocument;
  footer = footerDocument;
}

useHead({
  title: meta?.title,
  meta: [{ name: 'description', content: meta?.description }]
});
</script>
