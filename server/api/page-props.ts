import { getFetchOptions, getWorkspace, resolveReferences } from '../../utils';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const workspace = getWorkspace();
  const { path } = getQuery(event);

  const reqDoc = await fetch(
    `https://api.doc2.site/v1/docs/${workspace}/${config.public.project}?path=${path}`,
    getFetchOptions(workspace)
  );

  if (!reqDoc.ok) {
    throw createError({
      statusCode: 404,
      fatal: true,
      statusMessage: 'Page Not Found'
    });
  }

  const doc: Document = await reqDoc.json();

  const { meta, hast, components, references } = doc;

  const refs = references ? await resolveReferences(references, workspace) : undefined;

  return {
    meta,
    hast,
    refs,
    components
  };
});
