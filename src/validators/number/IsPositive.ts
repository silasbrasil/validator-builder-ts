import { assert } from "../Assert";


export function isPositive(input: number): assert {
  return (): boolean => {
    if (input) {
        return input > 0;
    }
    return false;
  }
}