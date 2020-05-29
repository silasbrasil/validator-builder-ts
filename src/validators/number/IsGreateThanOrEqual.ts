import { assert } from "../Assert";

export function isGreaterThanOrEqual(input: number, threshold: number): assert {
  return ():boolean => {
    if (typeof input === "undefined" || input === null) {
        return false;
    }
    return input >= threshold;
  }
}