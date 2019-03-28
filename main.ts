type Nothing = void;
type Just<T = unknown> = T;
type Maybe<T = unknown> = Just<T> | Nothing;

function Nothing(): Nothing {
  return void 0;
}

function Just<T = unknown>(value: any): Just<T> {
  return value === undefined ? Nothing() : value;
}

function handleFallback<T = unknown>(val: unknown): Just<T> {
  return typeof val === "undefined"
    ? Nothing()
    : typeof val === "function"
    ? val()
    : val;
}

/**
 * @method mjn
 * @param {any} obj
 * @param {String} path
 * @param {any} fallback
 * @returns {any}
 */

function mjn<T = any>(obj: any, path: string, fallback?: T): Maybe<T> {
  const arrToPath: any[] = path
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");

  try {
    let i = 0;
    while (i < arrToPath.length) {
      if (arrToPath[i] in obj) {
        obj = obj[arrToPath[i]];
        i++;
      } else {
        return handleFallback(fallback);
      }
    }
    return Just<T>(obj);
  } catch (err) {
    return handleFallback(fallback);
  }
}

export default mjn;
