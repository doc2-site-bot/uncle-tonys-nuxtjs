/**
 * Resolve all document or spreadsheet references in parallel
 */
async function resolveReferences(references: string[]) {
  const reqRefs = references.map((reference) => {
    return new Promise((resolve, reject) => {
      fetch(reference)
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
              reference,
              {
                hast,
                components,
                references
              }
            ]);
          } else if (res.type === 'spreadsheet') {
            const { rows, keys } = res;

            return resolve([
              reference,
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

  return Object.fromEntries(resolvedRefs) as Reference;
}

export { resolveReferences };
