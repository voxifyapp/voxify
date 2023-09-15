import { createContext, useContext } from 'react';

/**
 * Helper function that enables creating a context with no upfront value
 * without having to undefined check all the time
 */
export function createCtx<A>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) {
      throw new Error('useCtx must be inside a Provider with a value');
    }
    return c;
  }
  return [useCtx, ctx.Provider, ctx.Consumer] as const; // make TypeScript infer a tuple, not an array of union types
}
