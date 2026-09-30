/**
 * Safe JSON Serialization and Cloning Utilities
 * Prevents "TypeError: Converting circular structure to JSON" when handling objects
 * that might contain DOM Elements (like HTMLVideoElement), Events, React Fiber nodes,
 * or cyclical references.
 */

export function safeJsonStringify(obj: any, space?: number): string {
  const seen = new WeakSet();

  return JSON.stringify(
    obj,
    (_key, value) => {
      // 1. Filter out DOM Elements & Nodes (e.g. HTMLVideoElement, HTMLDivElement, etc.)
      if (typeof window !== 'undefined') {
        if (
          value instanceof Element ||
          value instanceof Node ||
          value instanceof Event ||
          value === window ||
          value === document
        ) {
          return undefined;
        }
      }

      // 2. Filter out React internal properties and Fiber nodes
      if (_key.startsWith('__reactFiber') || _key.startsWith('__reactProps') || _key.startsWith('_reactRootContainer')) {
        return undefined;
      }

      // 3. Handle non-null object circular references
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }

      return value;
    },
    space
  );
}

export function safeClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  try {
    return JSON.parse(safeJsonStringify(obj));
  } catch {
    if (Array.isArray(obj)) {
      return [...obj] as unknown as T;
    }
    return { ...obj };
  }
}
