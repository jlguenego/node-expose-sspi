import type * as NodeFetchModule from 'node-fetch';

type NodeFetchInternal = typeof NodeFetchModule;

export interface NodeFetch extends NodeFetchInternal {
  fetch: NodeFetchInternal['default'];
}

// Prevent transpiling `await import(...)` into a simple require call.
// This would not work because this library compiles to commonjs but node-fetch is a esm library by now.
// Wrapping the import expression into a string hides it from the typescript compiler, so the
// native import expression will be used.
//
// Note that a future typescript module target would fix this as well ("Node12").
//
// See
//  - https://github.com/microsoft/TypeScript/issues/43329#issuecomment-1008361973
//  - https://nodejs.org/docs/latest-v12.x/api/esm.html#esm_import_expressions
const internalLoader = new Function(
  'return import("node-fetch")'
) as () => Promise<NodeFetchInternal>;

export async function loadNodeFetch(): Promise<NodeFetch> {
  const module = await internalLoader();
  return {
    ...module,
    fetch: module.default,
  };
}
