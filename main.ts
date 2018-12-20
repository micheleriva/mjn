type Nothing = void;
type Just = any;
type Maybe = Just | Nothing;

function Nothing(): Nothing {
  return void 0;
}

function Just(value: any): Just {
  return value === null ? Nothing() : value;
}

function handleFallback(val: any): Just {
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
 * @param {any} path
 * @returns {any}
 */

function mjn(obj: any, path: string, fallback: any): Maybe {
  const arrToPath: any[] = path
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");

  try {
    for (let index of arrToPath) {
      if (index in obj) {
        obj = obj[index];
      } else {
        return handleFallback(fallback);
      }
    }
    return Just(obj);
  } catch (err) {
    return handleFallback(fallback);
  }
}

export default mjn;
