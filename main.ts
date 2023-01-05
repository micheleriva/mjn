type Nothing = void;
type Just<T = unknown> = T;
type Maybe<T = unknown> = Just<T> | Nothing;

function handleFallback<T = unknown>(val: unknown): Just<T> {
  return val === undefined ? void 0 : typeof val === "function" ? val() : val;
}

/**
 * @method mjn
 * @param {any} obj
 * @param {String} path
 * @param {any} fallback
 * @returns {any}
 */

function mjn<T = any>(obj: any, path: string, fallback?: T): Maybe<T> {
  // Initialize an empty array to hold the path segments
  const arrToPath: any[] = [];
  // Initialize a string to hold the current segment
  let segment = "";

  // Loop through the characters in the path string
  for (let i = 0; i < path.length; i++) {
    const c = path[i];
    // If the character is a '.' or a '['
    if (c === "." || c === "[") {
      // If the segment is not empty, add it to the array
      if (segment !== "") arrToPath.push(segment);
      // Reset the segment
      segment = "";
    } else if (c === "]") {
      // If the character is a ']', add the segment to the array
      arrToPath.push(segment);
      // Reset the segment
      segment = "";
    } else {
      // Otherwise, append the character to the segment
      segment += c;
    }
  }

  // If the segment is not empty, add it to the array
  if (segment !== "") arrToPath.push(segment);

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
    return obj === undefined ? void 0 : obj;
  } catch (_) {
    return handleFallback(fallback);
  }
}

export default mjn;
