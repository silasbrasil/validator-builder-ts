import { assert } from "../Assert";

export function isGreaterThan(input: number, threshold: number): assert {
  return (): boolean => {
    if (input) {
        return input > threshold;
    }
    return false;
  }
}
