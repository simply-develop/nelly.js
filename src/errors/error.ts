
export class NellyError extends Error {
  /**
   * Emit errors
   * @param {String} name
   */

  constructor(
    name: string
  ) {
    const msg = '"' + name + '"' + "\n";
    super(msg);
  }
}

Object.defineProperty(NellyError.prototype, "name", {
  value: "NellyError",
});
