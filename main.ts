type Nothing = void;
type Just = any;
type Maybe = Just | Nothing;
type Obj = object | any[];

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

const mjn = (obj: Obj, path: string): Maybe => {
  const arrToPath: Array<any> = path
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
};

export default mjn;
