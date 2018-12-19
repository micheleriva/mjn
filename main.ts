type Nothing = void;
type Just = any;
type Maybe = Just | Nothing;

function Nothing(): Nothing {
  return void 0;
}

function Just(value: any): Just {
  return value === null ? Nothing() : value;
}

/**
 * @method mjn
 * @param {Object} obj
 * @param {String} path
 * @returns {any}
 */

function mjn(obj: any, path: string): Maybe {
  const arrToPath: any[] = path
    .replace(/\[(\w+)\]/g, ".$1")
    .replace(/^\./, "")
    .split(".");

  try {
    for (let index of arrToPath) {
      if (index in obj) {
        obj = obj[index];
      } else {
        return Nothing();
      }
    }
    return Just(obj);
  } catch (err) {
    return Nothing();
  }
}

export default mjn;
