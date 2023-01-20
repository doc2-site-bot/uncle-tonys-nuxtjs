const config = useRuntimeConfig();

/**
 * Resolve all document or spreadsheet references in parallel
 */
async function resolveReferences(references: Array<{ url: string; type: string }>, workspace: string) {
  const reqRefs = references
    .filter(({ type }) => type === 'document' || type === 'spreadsheet')
    .map((reference) => {
      return new Promise((resolve, reject) => {
        fetch(reference.url, getFetchOptions(workspace))
          .then((res) => {
            if (!res.ok) {
              throw new Error('Unresolved');
            }
            return res.json();
          })
          .then((res) => {
            if (res.type === 'document') {
              const { hast, components, references } = res;

              return resolve([
                reference.url,
                {
                  hast,
                  components,
                  references
                }
              ]);
            } else if (res.type === 'spreadsheet') {
              const { rows, keys } = res;

              return resolve([
                reference.url,
                {
                  rows,
                  keys
                }
              ]);
            }

            return resolve([reference, res]);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

  const resolvedRefs = (await Promise.all(reqRefs)) as Array<[string, Document | Spreadsheet]>;

  return Object.fromEntries(resolvedRefs) as ResolvedReference;
}

/**
 * Resolve workspace either "dev", "preview" or "live"
 * */
function getWorkspace() {
  if (config.D2S_EMAIL && config.D2S_SECRET) {
    return 'dev';
  }

  return process.env.NODE_ENV === 'production' ? 'live' : 'preview';
}

/**
 * Returns fetch options with auth header if workspace is "dev"
 *
 * @param workspace
 */
function getFetchOptions(workspace: string) {
  let options;

  if (workspace === 'dev') {
    const authorization = `basic ${btoa(`${config.D2S_EMAIL}:${config.D2S_SECRET}`)}`;

    options = {
      headers: {
        authorization
      }
    };
  }

  return options;
}

export { resolveReferences, getWorkspace, getFetchOptions };
