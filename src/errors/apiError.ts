export class DiscordApiError extends Error {
  /**
   * Emit errors
   * @param {Error | any} name
   */

  constructor(err: Error | any) {

    let msg =
      err.message +
      (err?.errors?.activities
        ? err.errors.activities["0"].type._errors[0].code +
          "\n\n" +
          err.errors.activities["0"].type._errors[0].message
        : "");
    super(
      err.code === "ENOTFOUND"
        ? "You don't have access to the Discord api.\n\nThis may due to the hosting device not connected to the internet\n\t(or)\nBot token is invalid\n"
        : msg
    );
  }
}

Object.defineProperty(DiscordApiError.prototype, "name", {
  value: "DiscordApiError",
});
